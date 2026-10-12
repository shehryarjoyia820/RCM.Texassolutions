<?php
/**
 * RCM > Leads > single lead. Rendered by \RCM\Leads::render_admin().
 *
 * @var array      $lead        Leads::get()
 * @var array      $notes       rows of rcm_lead_notes
 * @var array      $activity    rows of rcm_lead_activity (newest first)
 * @var array      $chats       rows of rcm_chat_sessions for this lead
 * @var array      $duplicates  leads whose duplicate_of is this lead
 * @var \WP_User[] $users       assignable users (ID, display_name)
 * @var bool       $can_manage
 * @var bool       $can_delete
 * @var array|null $notice      [type, message]
 */

defined('ABSPATH') || exit;

use RCM\Leads;

$rcm_list = admin_url('admin.php?page=rcm-leads');
$rcm_lead_url = static fn(string $id): string => add_query_arg('lead', rawurlencode($id), $rcm_list);
$rcm_post = admin_url('admin-post.php');
$rcm_id = $lead['id'];

$rcm_rows = [
    __('Email', 'rcm') => $lead['email'] !== '' ? '<a href="' . esc_url('mailto:' . $lead['email']) . '">' . esc_html($lead['email']) . '</a>' : '',
    __('Phone', 'rcm') => $lead['phone'] !== '' ? '<a href="' . esc_url('tel:' . preg_replace('/[^\d+]/', '', $lead['phone'])) . '">' . esc_html($lead['phone']) . '</a>' : '',
    __('Practice/company', 'rcm') => esc_html($lead['company']),
    __('State', 'rcm') => esc_html($lead['state']),
    __('Specialty', 'rcm') => esc_html($lead['specialty']),
    __('Providers', 'rcm') => esc_html($lead['providers']),
    __('Current billing', 'rcm') => esc_html($lead['current_billing']),
    __('Monthly claims', 'rcm') => esc_html($lead['monthly_claims']),
    __('Services', 'rcm') => esc_html(implode(', ', array_map([Leads::class, 'service_name'], $lead['services']))),
    __('Challenges', 'rcm') => esc_html($lead['challenges']),
    __('Preferred contact', 'rcm') => esc_html($lead['preferred_contact']),
    __('Preferred consultation date', 'rcm') => $lead['preferred_date'] !== '' ? esc_html(mysql2date(get_option('date_format'), $lead['preferred_date'])) : '',
    __('Source', 'rcm') => esc_html(Leads::source_label($lead['source'])),
    __('Page', 'rcm') => esc_html($lead['source_page']),
    __('Received', 'rcm') => esc_html(Leads::fmt_date($lead['created_at'])),
    __('Last updated', 'rcm') => esc_html(Leads::fmt_date($lead['updated_at'])),
];
$rcm_kind_labels = [
    'created' => __('Created', 'rcm'),
    'duplicate' => __('Duplicate', 'rcm'),
    'status' => __('Status', 'rcm'),
    'assigned' => __('Assignment', 'rcm'),
    'follow_up' => __('Follow-up', 'rcm'),
    'note' => __('Note', 'rcm'),
    'notified' => __('Email', 'rcm'),
    'notify_failed' => __('Email', 'rcm'),
];
?>
<div class="wrap rcm-lead">
    <p><a href="<?php echo esc_url($rcm_list); ?>">&larr; <?php esc_html_e('All leads', 'rcm'); ?></a></p>
    <h1 class="wp-heading-inline"><?php echo esc_html($lead['name']); ?></h1>
    <span class="rcm-lead-id rcm-mono"><?php echo esc_html($rcm_id); ?></span>
    <hr class="wp-header-end">

    <p class="rcm-lead-badges">
        <span class="rcm-pill rcm-status-<?php echo esc_attr($lead['status']); ?>"><?php echo esc_html(Leads::status_label($lead['status'])); ?></span>
        <span class="rcm-band rcm-band-<?php echo esc_attr(strtolower($lead['band'])); ?>"><?php echo esc_html($lead['band']); ?></span>
        <span class="rcm-score">
            <?php
            /* translators: %d: lead score */
            echo esc_html(sprintf(__('Score %d', 'rcm'), $lead['score']));
            ?>
        </span>
        <span class="rcm-pill"><?php echo esc_html(Leads::source_label($lead['source'])); ?></span>
        <?php if ($lead['duplicate_of']) : ?>
            <a class="rcm-pill rcm-pill-dup" href="<?php echo esc_url($rcm_lead_url($lead['duplicate_of'])); ?>">
                <?php
                /* translators: %s: lead ID */
                echo esc_html(sprintf(__('Possible duplicate of %s', 'rcm'), $lead['duplicate_of']));
                ?>
            </a>
        <?php endif; ?>
    </p>

    <?php if ($notice) : ?>
        <div class="notice notice-<?php echo esc_attr($notice[0]); ?> is-dismissible"><p><?php echo esc_html($notice[1]); ?></p></div>
    <?php endif; ?>

    <div class="rcm-lead-grid">
        <div class="rcm-lead-main">
            <section class="rcm-panel">
                <h2><?php esc_html_e('Contact and practice', 'rcm'); ?></h2>
                <table class="widefat striped rcm-kv">
                    <tbody>
                        <?php foreach ($rcm_rows as $rcm_label => $rcm_html) :
                            if ($rcm_html === '') {
                                continue;
                            } ?>
                            <tr>
                                <th scope="row"><?php echo esc_html($rcm_label); ?></th>
                                <td><?php echo wp_kses($rcm_html, ['a' => ['href' => true]]); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </section>

            <?php if ($lead['message'] !== '') : ?>
                <section class="rcm-panel">
                    <h2><?php esc_html_e('Message', 'rcm'); ?></h2>
                    <div class="rcm-pre"><?php echo esc_html($lead['message']); ?></div>
                </section>
            <?php endif; ?>

            <?php if ($lead['summary'] !== '') : ?>
                <section class="rcm-panel">
                    <h2><?php esc_html_e('Summary', 'rcm'); ?></h2>
                    <div class="rcm-pre"><?php echo esc_html($lead['summary']); ?></div>
                </section>
            <?php endif; ?>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Notes', 'rcm'); ?></h2>
                <?php if (!$notes) : ?>
                    <p class="rcm-muted"><?php esc_html_e('No notes yet.', 'rcm'); ?></p>
                <?php else : ?>
                    <ol class="rcm-notes">
                        <?php foreach ($notes as $rcm_note) : ?>
                            <li>
                                <div class="rcm-note-meta">
                                    <strong><?php echo esc_html(Leads::user_name($rcm_note['user_id'] ? (int) $rcm_note['user_id'] : null) ?: __('System', 'rcm')); ?></strong>
                                    <span class="rcm-muted"><?php echo esc_html(Leads::fmt_date((string) $rcm_note['created_at'])); ?></span>
                                </div>
                                <div class="rcm-pre"><?php echo esc_html((string) $rcm_note['body']); ?></div>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                <?php endif; ?>
                <?php if ($can_manage) : ?>
                    <form method="post" action="<?php echo esc_url($rcm_post); ?>" class="rcm-note-form">
                        <input type="hidden" name="action" value="rcm_lead_note">
                        <input type="hidden" name="lead_id" value="<?php echo esc_attr($rcm_id); ?>">
                        <?php wp_nonce_field('rcm_lead_note_' . $rcm_id); ?>
                        <label for="rcm-note" class="screen-reader-text"><?php esc_html_e('Add a note', 'rcm'); ?></label>
                        <textarea id="rcm-note" name="note" rows="4" class="large-text" maxlength="5000" required placeholder="<?php esc_attr_e('Add a note for the team. Do not paste patient information.', 'rcm'); ?>"></textarea>
                        <p><input type="submit" class="button button-primary" value="<?php esc_attr_e('Add note', 'rcm'); ?>"></p>
                    </form>
                <?php endif; ?>
            </section>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Activity', 'rcm'); ?></h2>
                <?php if (!$activity) : ?>
                    <p class="rcm-muted"><?php esc_html_e('No activity recorded.', 'rcm'); ?></p>
                <?php else : ?>
                    <ol class="rcm-timeline">
                        <?php foreach ($activity as $rcm_a) :
                            $rcm_kind = (string) $rcm_a['kind'];
                            $rcm_who = Leads::user_name($rcm_a['user_id'] ? (int) $rcm_a['user_id'] : null);
                            ?>
                            <li class="rcm-timeline-<?php echo esc_attr(sanitize_html_class($rcm_kind)); ?>">
                                <span class="rcm-timeline-kind"><?php echo esc_html($rcm_kind_labels[$rcm_kind] ?? $rcm_kind); ?></span>
                                <span><?php echo esc_html((string) $rcm_a['detail']); ?></span>
                                <span class="rcm-muted">
                                    <?php echo esc_html(Leads::fmt_date((string) $rcm_a['at'])); ?>
                                    <?php if ($rcm_who !== '') : ?>
                                        &middot; <?php echo esc_html($rcm_who); ?>
                                    <?php endif; ?>
                                </span>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                <?php endif; ?>
            </section>
        </div>

        <div class="rcm-lead-side">
            <section class="rcm-panel">
                <h2><?php esc_html_e('Manage', 'rcm'); ?></h2>
                <?php if (!$can_manage) : ?>
                    <p class="rcm-muted"><?php esc_html_e('You can view this lead. Only leads assigned to you can be changed.', 'rcm'); ?></p>
                <?php endif; ?>
                <form method="post" action="<?php echo esc_url($rcm_post); ?>">
                    <input type="hidden" name="action" value="rcm_lead_update">
                    <input type="hidden" name="lead_id" value="<?php echo esc_attr($rcm_id); ?>">
                    <?php wp_nonce_field('rcm_lead_update_' . $rcm_id); ?>
                    <fieldset <?php disabled(!$can_manage); ?>>
                        <p>
                            <label for="rcm-status"><strong><?php esc_html_e('Status', 'rcm'); ?></strong></label><br>
                            <select id="rcm-status" name="status" class="widefat">
                                <?php foreach (Leads::STATUSES as $rcm_s) : ?>
                                    <option value="<?php echo esc_attr($rcm_s); ?>" <?php selected($lead['status'], $rcm_s); ?>><?php echo esc_html(Leads::status_label($rcm_s)); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </p>
                        <p>
                            <label for="rcm-assigned"><strong><?php esc_html_e('Assigned to', 'rcm'); ?></strong></label><br>
                            <select id="rcm-assigned" name="assigned_to" class="widefat">
                                <option value="0"><?php esc_html_e('Unassigned', 'rcm'); ?></option>
                                <?php foreach ($users as $rcm_u) : ?>
                                    <option value="<?php echo esc_attr((string) $rcm_u->ID); ?>" <?php selected((int) $lead['assigned_to'], (int) $rcm_u->ID); ?>><?php echo esc_html((string) $rcm_u->display_name); ?></option>
                                <?php endforeach; ?>
                            </select>
                        </p>
                        <p>
                            <label for="rcm-follow-up"><strong><?php esc_html_e('Follow-up date', 'rcm'); ?></strong></label><br>
                            <input type="date" id="rcm-follow-up" name="follow_up_at" class="widefat" value="<?php echo esc_attr((string) $lead['follow_up_at']); ?>">
                        </p>
                        <p><input type="submit" class="button button-primary" value="<?php esc_attr_e('Save changes', 'rcm'); ?>"></p>
                    </fieldset>
                </form>
            </section>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Score', 'rcm'); ?></h2>
                <p>
                    <span class="rcm-band rcm-band-<?php echo esc_attr(strtolower($lead['band'])); ?>"><?php echo esc_html($lead['band']); ?></span>
                    <span class="rcm-score"><?php echo esc_html((string) $lead['score']); ?> / 100</span>
                </p>
                <?php if ($lead['score_reasons']) : ?>
                    <ul class="rcm-reasons">
                        <?php foreach ($lead['score_reasons'] as $rcm_r) : ?>
                            <li><?php echo esc_html($rcm_r); ?></li>
                        <?php endforeach; ?>
                    </ul>
                <?php else : ?>
                    <p class="rcm-muted"><?php esc_html_e('No scoring signals.', 'rcm'); ?></p>
                <?php endif; ?>
            </section>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Attribution', 'rcm'); ?></h2>
                <?php if ($lead['attribution']) : ?>
                    <dl class="rcm-dl">
                        <?php foreach ($lead['attribution'] as $rcm_k => $rcm_v) : ?>
                            <dt><?php echo esc_html((string) $rcm_k); ?></dt>
                            <dd><?php echo esc_html($rcm_v); ?></dd>
                        <?php endforeach; ?>
                    </dl>
                <?php else : ?>
                    <p class="rcm-muted"><?php esc_html_e('No attribution recorded.', 'rcm'); ?></p>
                <?php endif; ?>
            </section>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Consent', 'rcm'); ?></h2>
                <dl class="rcm-dl">
                    <dt><?php esc_html_e('Contact consent', 'rcm'); ?></dt>
                    <dd><?php echo $lead['consent_at'] ? esc_html(sprintf(__('Yes, %s', 'rcm'), Leads::fmt_date($lead['consent_at']))) : esc_html__('No', 'rcm'); ?></dd>
                    <?php if ($lead['consent_text'] !== '') : ?>
                        <dt><?php esc_html_e('Wording shown', 'rcm'); ?></dt>
                        <dd><?php echo esc_html($lead['consent_text']); ?></dd>
                    <?php endif; ?>
                    <dt><?php esc_html_e('Marketing emails', 'rcm'); ?></dt>
                    <dd><?php echo $lead['marketing_consent'] ? esc_html__('Yes', 'rcm') : esc_html__('No', 'rcm'); ?></dd>
                </dl>
            </section>

            <?php if ($lead['duplicate_of'] || $duplicates) : ?>
                <section class="rcm-panel">
                    <h2><?php esc_html_e('Duplicates', 'rcm'); ?></h2>
                    <?php if ($lead['duplicate_of']) : ?>
                        <p>
                            <?php esc_html_e('Same email as earlier lead', 'rcm'); ?>
                            <a href="<?php echo esc_url($rcm_lead_url($lead['duplicate_of'])); ?>" class="rcm-mono"><?php echo esc_html($lead['duplicate_of']); ?></a>
                        </p>
                    <?php endif; ?>
                    <?php if ($duplicates) : ?>
                        <p><?php esc_html_e('Later submissions with the same email:', 'rcm'); ?></p>
                        <ul>
                            <?php foreach ($duplicates as $rcm_d) : ?>
                                <li>
                                    <a href="<?php echo esc_url($rcm_lead_url((string) $rcm_d['id'])); ?>" class="rcm-mono"><?php echo esc_html((string) $rcm_d['id']); ?></a>
                                    <span class="rcm-muted"><?php echo esc_html(Leads::source_label((string) $rcm_d['source']) . ', ' . Leads::fmt_date((string) $rcm_d['created_at'])); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </section>
            <?php endif; ?>

            <section class="rcm-panel">
                <h2><?php esc_html_e('Chat sessions', 'rcm'); ?></h2>
                <?php if (!$chats) : ?>
                    <p class="rcm-muted"><?php esc_html_e('No assistant chats linked to this lead.', 'rcm'); ?></p>
                <?php else : ?>
                    <ul class="rcm-chats">
                        <?php foreach ($chats as $rcm_c) : ?>
                            <li>
                                <a href="<?php echo esc_url(add_query_arg(['page' => 'rcm-chats', 'session' => rawurlencode((string) $rcm_c['id'])], admin_url('admin.php'))); ?>" class="rcm-mono"><?php echo esc_html((string) $rcm_c['id']); ?></a>
                                <?php if (!empty($rcm_c['needs_human'])) : ?>
                                    <span class="rcm-pill rcm-pill-dup"><?php esc_html_e('Needs a person', 'rcm'); ?></span>
                                <?php endif; ?>
                                <div class="rcm-muted">
                                    <?php
                                    /* translators: 1: date, 2: number of messages, 3: status */
                                    echo esc_html(sprintf(__('%1$s, %2$d messages, %3$s', 'rcm'), Leads::fmt_date((string) $rcm_c['created_at']), (int) $rcm_c['message_count'], (string) $rcm_c['status']));
                                    ?>
                                </div>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                <?php endif; ?>
            </section>

            <?php if ($can_delete) : ?>
                <section class="rcm-panel rcm-danger">
                    <h2><?php esc_html_e('Delete lead', 'rcm'); ?></h2>
                    <form method="post" action="<?php echo esc_url($rcm_post); ?>">
                        <input type="hidden" name="action" value="rcm_lead_delete">
                        <input type="hidden" name="lead_id" value="<?php echo esc_attr($rcm_id); ?>">
                        <?php wp_nonce_field('rcm_lead_delete_' . $rcm_id); ?>
                        <p>
                            <label>
                                <input type="checkbox" name="confirm" value="1" required>
                                <?php esc_html_e('I understand this permanently deletes the lead, its notes and its activity.', 'rcm'); ?>
                            </label>
                        </p>
                        <p><input type="submit" class="button button-link-delete" value="<?php esc_attr_e('Delete lead', 'rcm'); ?>"></p>
                    </form>
                </section>
            <?php endif; ?>
        </div>
    </div>
</div>
