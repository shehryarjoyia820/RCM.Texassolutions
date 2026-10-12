<?php
/**
 * RCM > Chats > one conversation.
 *
 * @var array|null $session
 * @var array      $messages
 * @var array      $flags
 * @var array|null $lead
 */

defined('ABSPATH') || exit;

$back = admin_url('admin.php?page=rcm-chats');
$fmt = get_option('date_format') . ' ' . get_option('time_format');

if (!$session) : ?>
    <div class="wrap">
        <h1><?php esc_html_e('Chat not found', 'rcm'); ?></h1>
        <p><?php esc_html_e('This chat does not exist or was deleted.', 'rcm'); ?></p>
        <p><a href="<?php echo esc_url($back); ?>">&larr; <?php esc_html_e('All chats', 'rcm'); ?></a></p>
    </div>
    <?php
    return;
endif;

$sid = (string) $session['id'];
$profile = (array) $session['profile'];
$profile_labels = [
    'specialty' => __('Specialty', 'rcm'),
    'location' => __('Location', 'rcm'),
    'providers' => __('Providers', 'rcm'),
    'currentBilling' => __('Current billing', 'rcm'),
    'services' => __('Interested in', 'rcm'),
    'challenges' => __('Challenges', 'rcm'),
    'monthlyClaims' => __('Monthly claims', 'rcm'),
    'preferredContact' => __('Preferred contact', 'rcm'),
    'phone' => __('Phone', 'rcm'),
    'wantsConsultation' => __('Accepted a free consultation', 'rcm'),
];
$flag_labels = [
    'unanswered' => __('Unanswered question', 'rcm'),
    'handoff' => __('Asked for a person', 'rcm'),
    'error' => __('Assistant error', 'rcm'),
    'phi' => __('Patient information withheld', 'rcm'),
];
$review_labels = [
    'unreviewed' => __('Not reviewed', 'rcm'),
    'good' => __('Good', 'rcm'),
    'needs_fix' => __('Needs fix', 'rcm'),
];
?>
<div class="wrap rcm-chat-detail">
    <p><a href="<?php echo esc_url($back); ?>">&larr; <?php esc_html_e('All chats', 'rcm'); ?></a></p>
    <h1>
        <?php
        /* translators: %s: chat session ID */
        echo esc_html(sprintf(__('Chat %s', 'rcm'), $sid));
        ?>
    </h1>

    <?php \RCM\Chat::render_status_notice(); ?>

    <?php if (!empty($_GET['updated'])) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
        <div class="notice notice-success is-dismissible"><p><?php esc_html_e('Review saved.', 'rcm'); ?></p></div>
    <?php endif; ?>

    <div class="rcm-chat-layout">
        <div class="rcm-chat-main">
            <h2><?php esc_html_e('Transcript', 'rcm'); ?></h2>
            <?php if (!$messages) : ?>
                <p class="description"><?php esc_html_e('No messages yet.', 'rcm'); ?></p>
            <?php endif; ?>
            <ol class="rcm-transcript">
                <?php foreach ($messages as $m) :
                    $is_user = $m['role'] === 'user';
                    $flagged = (string) ($m['meta']['flagged'] ?? '');
                    $links = (array) ($m['meta']['links'] ?? []);
                    ?>
                    <li class="rcm-msg <?php echo $is_user ? 'rcm-msg--user' : 'rcm-msg--assistant'; ?><?php echo $flagged !== '' ? ' rcm-msg--flagged' : ''; ?>">
                        <div class="rcm-msg__head">
                            <strong><?php echo $is_user ? esc_html__('Visitor', 'rcm') : esc_html__('Assistant', 'rcm'); ?></strong>
                            <time datetime="<?php echo esc_attr(gmdate('c', (int) strtotime($m['created_at'] . ' UTC'))); ?>"><?php echo esc_html(get_date_from_gmt($m['created_at'], $fmt)); ?></time>
                            <?php if ($flagged === 'phi') : ?><span class="rcm-chat-pill rcm-chat-pill--warn"><?php esc_html_e('PHI guard', 'rcm'); ?></span><?php endif; ?>
                        </div>
                        <div class="rcm-msg__body"><?php echo nl2br(esc_html($m['content'])); ?></div>
                        <?php if ($links) : ?>
                            <ul class="rcm-msg__links">
                                <?php foreach ($links as $l) :
                                    if (!is_array($l) || empty($l['href'])) {
                                        continue;
                                    }
                                    ?>
                                    <li><a href="<?php echo esc_url((string) $l['href']); ?>" target="_blank" rel="noopener"><?php echo esc_html((string) ($l['label'] ?? $l['href'])); ?></a> <code><?php echo esc_html((string) $l['href']); ?></code></li>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ol>
        </div>

        <div class="rcm-chat-side">
            <div class="postbox">
                <h2 class="hndle"><?php esc_html_e('Lead', 'rcm'); ?></h2>
                <div class="inside">
                    <?php if ($lead) : ?>
                        <p>
                            <strong><?php echo esc_html((string) $lead['name']); ?></strong><br>
                            <a href="mailto:<?php echo esc_attr(antispambot((string) $lead['email'])); ?>"><?php echo esc_html((string) $lead['email']); ?></a>
                            <?php if (!empty($lead['company'])) : ?><br><?php echo esc_html((string) $lead['company']); ?><?php endif; ?>
                        </p>
                        <?php if (current_user_can('rcm_view_leads')) : ?>
                            <p><a class="button" href="<?php echo esc_url(\RCM\Chat::lead_admin_url((string) $lead['id'])); ?>"><?php esc_html_e('Open lead', 'rcm'); ?></a></p>
                        <?php endif; ?>
                    <?php else : ?>
                        <p class="description"><?php esc_html_e('The lead for this chat was deleted.', 'rcm'); ?></p>
                    <?php endif; ?>
                    <table class="rcm-chat-facts">
                        <tr><th scope="row"><?php esc_html_e('Started', 'rcm'); ?></th><td><?php echo esc_html(get_date_from_gmt((string) $session['created_at'], $fmt)); ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Last message', 'rcm'); ?></th><td><?php echo $session['last_message_at'] ? esc_html(get_date_from_gmt((string) $session['last_message_at'], $fmt)) : '&mdash;'; ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Messages', 'rcm'); ?></th><td><?php echo esc_html((string) $session['message_count']); ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Status', 'rcm'); ?></th><td><?php echo $session['status'] === 'active' ? esc_html__('Active', 'rcm') : esc_html__('Ended', 'rcm'); ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Needs follow-up', 'rcm'); ?></th><td><?php echo $session['needs_human'] ? '<span class="rcm-chat-pill rcm-chat-pill--warn">' . esc_html__('Yes', 'rcm') . '</span>' : esc_html__('No', 'rcm'); ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Remembered on device', 'rcm'); ?></th><td><?php echo (int) $session['remember'] === 1 ? esc_html__('Yes', 'rcm') : esc_html__('No', 'rcm'); ?></td></tr>
                        <tr><th scope="row"><?php esc_html_e('Summary emailed', 'rcm'); ?></th><td><?php echo (int) $session['end_notified'] === 1 ? esc_html__('Yes', 'rcm') : esc_html__('Not yet', 'rcm'); ?></td></tr>
                    </table>
                </div>
            </div>

            <div class="postbox">
                <h2 class="hndle"><?php esc_html_e('Profile learned', 'rcm'); ?></h2>
                <div class="inside">
                    <?php
                    $shown = false;
                    echo '<dl class="rcm-chat-profile">';
                    foreach ($profile_labels as $key => $label) {
                        if (empty($profile[$key])) {
                            continue;
                        }
                        $value = $profile[$key];
                        if ($key === 'wantsConsultation') {
                            $value = __('Yes', 'rcm');
                        } elseif (is_array($value)) {
                            $value = implode(', ', array_map('strval', $value));
                        }
                        $shown = true;
                        echo '<dt>' . esc_html($label) . '</dt><dd>' . esc_html((string) $value) . '</dd>';
                    }
                    echo '</dl>';
                    if (!$shown) {
                        echo '<p class="description">' . esc_html__('No qualification details shared yet.', 'rcm') . '</p>';
                    }
                    ?>
                </div>
            </div>

            <div class="postbox">
                <h2 class="hndle"><?php esc_html_e('Flags', 'rcm'); ?></h2>
                <div class="inside">
                    <?php if (!$flags) : ?>
                        <p class="description"><?php esc_html_e('No flags for this chat.', 'rcm'); ?></p>
                    <?php else : ?>
                        <ul class="rcm-chat-flags">
                            <?php foreach ($flags as $f) : ?>
                                <li>
                                    <span class="rcm-chat-pill rcm-chat-pill--<?php echo esc_attr((string) $f['kind']); ?>"><?php echo esc_html($flag_labels[$f['kind']] ?? (string) $f['kind']); ?></span>
                                    <?php if ((int) $f['resolved'] === 1) : ?><span class="description"><?php esc_html_e('(resolved)', 'rcm'); ?></span><?php endif; ?>
                                    <br><?php echo esc_html((string) $f['detail']); ?>
                                    <br><span class="description"><?php echo esc_html(get_date_from_gmt((string) $f['created_at'], $fmt)); ?></span>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                        <?php if (current_user_can('rcm_manage_kb')) : ?>
                            <p><a href="<?php echo esc_url(admin_url('admin.php?page=rcm-kb#rcm-flags')); ?>"><?php esc_html_e('Manage open flags in the knowledge base', 'rcm'); ?></a></p>
                        <?php endif; ?>
                    <?php endif; ?>
                </div>
            </div>

            <div class="postbox">
                <h2 class="hndle"><?php esc_html_e('Review', 'rcm'); ?></h2>
                <div class="inside">
                    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                        <input type="hidden" name="action" value="rcm_chat_review">
                        <input type="hidden" name="session" value="<?php echo esc_attr($sid); ?>">
                        <?php wp_nonce_field('rcm_chat_review_' . $sid); ?>
                        <fieldset>
                            <legend class="screen-reader-text"><?php esc_html_e('Review status', 'rcm'); ?></legend>
                            <?php foreach ($review_labels as $value => $label) : ?>
                                <label class="rcm-chat-radio"><input type="radio" name="review" value="<?php echo esc_attr($value); ?>" <?php checked((string) $session['review'], $value); ?>> <?php echo esc_html($label); ?></label>
                            <?php endforeach; ?>
                        </fieldset>
                        <p>
                            <label for="rcm-review-note"><?php esc_html_e('Note (what should the assistant have said?)', 'rcm'); ?></label>
                            <textarea id="rcm-review-note" name="review_note" rows="4" class="widefat"><?php echo esc_textarea((string) ($session['review_note'] ?? '')); ?></textarea>
                        </p>
                        <p><button type="submit" class="button button-primary"><?php esc_html_e('Save review', 'rcm'); ?></button></p>
                    </form>
                </div>
            </div>

            <?php if (!empty($session['summary'])) : ?>
                <div class="postbox">
                    <h2 class="hndle"><?php esc_html_e('Summary sent to the team', 'rcm'); ?></h2>
                    <div class="inside"><pre class="rcm-chat-summary"><?php echo esc_html((string) $session['summary']); ?></pre></div>
                </div>
            <?php endif; ?>

            <?php if (current_user_can('rcm_delete_leads')) : ?>
                <div class="postbox">
                    <h2 class="hndle"><?php esc_html_e('Delete', 'rcm'); ?></h2>
                    <div class="inside">
                        <p class="description"><?php esc_html_e('Deletes this chat, its messages and flags. The lead is kept.', 'rcm'); ?></p>
                        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" onsubmit="return confirm('<?php echo esc_js(__('Delete this chat permanently?', 'rcm')); ?>');">
                            <input type="hidden" name="action" value="rcm_chat_delete">
                            <input type="hidden" name="session" value="<?php echo esc_attr($sid); ?>">
                            <?php wp_nonce_field('rcm_chat_delete_' . $sid); ?>
                            <button type="submit" class="button button-link-delete"><?php esc_html_e('Delete chat', 'rcm'); ?></button>
                        </form>
                    </div>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>
