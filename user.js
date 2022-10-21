/*firefox config*/


user_pref("browser.safebrowsing.downloads.enabled", true);
user_pref("browser.safebrowsing.downloads.remote.enabled", true);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous", true);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous", true);
user_pref("browser.safebrowsing.downloads.remote.block_dangerous_host", true);
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", true);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", true);
user_pref("browser.safebrowsing.malware.enabled", true);
user_pref("browser.safebrowsing.phishing.enabled", true);
user_pref("dom.disable_open_during_load", true);
user_pref("dom.block_multiple_popups", true);
user_pref("dom.block_download_insecure", true);
user_pref("dom.enable_performance", true);
user_pref("dom.allow_scripts_to_close_windows", false);
user_pref("media.autoplay.block-webaudio", true);
user_pref("media.block-autoplay-until-in-foreground", true);
user_pref("plugins.flashBlock.enabled", true);
user_pref("privacy.socialtracking.block_cookies.enabled", true);
user_pref("toolkit.telemetry.reportingpolicy.firstRun", false);

/****************************************************************************
 * Securefox                                                                *
 * "Natura non constristatur"                                               *     
 * priority: provide sensible security and privacy                          *  
 * version: November 2022b                                                  *
 * url: https://github.com/yokoffing/Betterfox                              *                   
****************************************************************************/

/****************************************************************************
 * SECTION: TRACKING PROTECTION                                             *
****************************************************************************/

// PREF: Enhanced Tracking Protection (ETP)
// Tracking Content blocking will strip cookies and block all resource requests to domains listed in Disconnect.me.
// Firefox deletes all stored site data (incl. cookies, browser storage) if the site is a known tracker and hasn’t
// been interacted with in the last 30 days.
// [NOTE] FF86: "Strict" tracking protection enables dFPI.
// [1] https://blog.mozilla.org/firefox/control-trackers-with-firefox/
// [2] https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop
// [3] https://blog.mozilla.org/security/2020/01/07/firefox-72-fingerprinting/
// [4] https://www.reddit.com/r/firefox/comments/l7xetb/network_priority_for_firefoxs_enhanced_tracking/gle2mqn/?web2x&context=3
//user_pref("privacy.trackingprotection.enabled", true); // DEFAULT
//user_pref("privacy.trackingprotection.pbmode.enabled", true); // DEFAULT
//user_pref("browser.contentblocking.customBlockList.preferences.ui.enabled", false); // DEFAULT
user_pref("browser.contentblocking.category", "strict");
//user_pref("privacy.trackingprotection.socialtracking.enabled", true); // enabled with "Strict"
    //user_pref("privacy.socialtracking.block_cookies.enabled", true); // DEFAULT
//user_pref("privacy.trackingprotection.cryptomining.enabled", true); // DEFAULT
//user_pref("privacy.trackingprotection.fingerprinting.enabled", true); // DEFAULT
user_pref("privacy.trackingprotection.emailtracking.enabled", true); // IN BETA
//user_pref("network.http.referer.disallowCrossSiteRelaxingDefault", true); // DEFAULT
    //user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode", true); // DEFAULT
    //user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.pbmode.top_navigation", true); // DEFAULT
    //user_pref("network.http.referer.disallowCrossSiteRelaxingDefault.top_navigation", true); // enabled with "Strict"

// PREF: query stripping
// We set the same query stripping list that Brave uses [1]
// [1] https://github.com/brave/brave-core/blob/f337a47cf84211807035581a9f609853752a32fb/browser/net/brave_site_hacks_network_delegate_helper.cc
// [2] https://gitlab.com/librewolf-community/settings/-/blob/master/librewolf.cfg#L80
//user_pref("privacy.query_stripping.enabled", true); // enabled with "Strict"
user_pref("privacy.query_stripping.strip_list", "__hsfp __hssc __hstc __s _hsenc _openstat dclid fbclid gbraid gclid hsCtaTracking igshid mc_eid ml_subscriber ml_subscriber_hash msclkid oft_c oft_ck oft_d oft_id oft_ids oft_k oft_lk oft_sk oly_anon_id oly_enc_id rb_clickid s_cid twclid vero_conv vero_id wbraid wickedid yclid");

// PREF: allow embedded tweets, Instagram, and Reddit posts
// [TEST - reddit embed] https://www.pcgamer.com/amazing-halo-infinite-bugs-are-already-rolling-in/
// [TEST - instagram embed] https://www.ndtv.com/entertainment/bharti-singh-and-husband-haarsh-limbachiyaa-announce-pregnancy-see-trending-post-2646359
// [TEST - tweet embed] https://www.newsweek.com/cryptic-tweet-britney-spears-shows-elton-john-collab-may-date-back-2015-1728036
// [1] https://www.reddit.com/r/firefox/comments/l79nxy/firefox_dev_is_ignoring_social_tracking_preference/gl84ukk
// [2] https://www.reddit.com/r/firefox/comments/pvds9m/reddit_embeds_not_loading/
user_pref("urlclassifier.trackingSkipURLs", "*.reddit.com, *.twitter.com, *.twimg.com"); // MANUAL
user_pref("urlclassifier.features.socialtracking.skipURLs", "*.instagram.com, *.twitter.com, *.twimg.com"); // MANUAL

// PREF: lower the priority of network loads for resources on the tracking protection list
// [NOTE] Applicable because we allow for some social embeds
// [1] https://github.com/arkenfox/user.js/issues/102#issuecomment-298413904
//user_pref("privacy.trackingprotection.lower_network_priority", true);

// PREF: disable allowance for embedded tweets, Instagram, and Reddit posts [OVERRIDE]
user_pref("urlclassifier.trackingSkipURLs", "");
user_pref("urlclassifier.features.socialtracking.skipURLs", "");
user_pref("privacy.trackingprotection.lower_network_priority", false);

// PREF: Site Isolation (Sandboxing)
// Creates operating system process-level boundaries for all sites loaded in Firefox for Desktop. Isolating each site
// into a separate operating system process makes it harder for malicious sites to read another site’s private data.
// [1] https://hacks.mozilla.org/2021/05/introducing-firefox-new-site-isolation-security-architecture/
// [2] https://hacks.mozilla.org/2022/05/improved-process-isolation-in-firefox-100/
// [3] https://hacks.mozilla.org/2021/12/webassembly-and-back-again-fine-grained-sandboxing-in-firefox-95/
//user_pref("fission.autostart", true); // DEFAULT

// PREF: State Paritioning [aka Dynamic First-Party Isolation (dFPI)]
// Firefox manages client-side state (i.e., data stored in the browser) to mitigate the ability of websites to abuse state
// for cross-site tracking. This effort aims to achieve that by providing what is effectively a "different", isolated storage
// location to every website a user visits.
// dFPI is a more web-compatible version of FPI, which double keys all third-party state by the origin of the top-level
// context. dFPI isolates user's browsing data for each top-level eTLD+1, but is flexible enough to apply web
// compatibility heuristics to address resulting breakage by dynamically modifying a frame's storage principal.
// dFPI isolates most sites while applying heuristics to allow sites through the isolation in certain circumstances for usability.
// [NOTE] dFPI partitions all of the following caches by the top-level site being visited: HTTP cache, image cache,
// favicon cache, HSTS cache, OCSP cache, style sheet cache, font cache, DNS cache, HTTP Authentication cache,
// Alt-Svc cache, and TLS certificate cache.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1549587
// [2] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/State_Partitioning
// [3] https://blog.mozilla.org/security/2021/02/23/total-cookie-protection/
// [4] https://hacks.mozilla.org/2021/02/introducing-state-partitioning/
// [5] https://github.com/arkenfox/user.js/issues/1281
// [6] https://hacks.mozilla.org/2022/02/improving-the-storage-access-api-in-firefox/
//user_pref("network.cookie.cookieBehavior", 5); // DEFAULT FF103+
//user_pref("browser.contentblocking.reject-and-isolate-cookies.preferences.ui.enabled", true); // DEFAULT

// PREF: Network Partitioning
// Networking-related APIs are not intended to be used for websites to store data, but they can be abused for
// cross-site tracking. Network APIs and caches are permanently partitioned by the top-level site.
// Network Partitioning (isolation) will allow Firefox to associate resources on a per-website basis rather than together
// in the same pool. This includes cache, favicons, CSS files, images, and even speculative connections. 
// [1] https://www.zdnet.com/article/firefox-to-ship-network-partitioning-as-a-new-anti-tracking-defense/
// [2] https://developer.mozilla.org/en-US/docs/Web/Privacy/State_Partitioning#network_partitioning
// [3] https://blog.mozilla.org/security/2021/01/26/supercookie-protections/
//user_pref("privacy.partition.network_state", true); // DEFAULT
    //user_pref("privacy.partition.serviceWorkers", true); // [DEFAULT: true FF105+]
    //user_pref("privacy.partition.network_state.ocsp_cache", true); // enabled with "Strict"
    //user_pref("privacy.partition.bloburl_per_agent_cluster", true); [REGRESSIONS]
// enable APS (Always Partitioning Storage) [FF104+]
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage", true);
user_pref("privacy.partition.always_partition_third_party_non_cookie_storage.exempt_sessionstorage", false); // [[FF105+]

// PREF: Smartblock
// [1] https://support.mozilla.org/en-US/kb/smartblock-enhanced-tracking-protection
// [2] https://www.youtube.com/watch?v=VE8SrClOTgw
// [3] https://searchfox.org/mozilla-central/source/browser/extensions/webcompat/data/shims.js
//user_pref("extensions.webcompat.enable_shims", true); // enabled with "Strict"

// PREF: Redirect Tracking Prevention
// All storage is cleared (more or less) daily from origins that are known trackers and that
// haven’t received a top-level user interaction (including scroll) within the last 45 days.
// [1] https://www.ghacks.net/2020/08/06/how-to-enable-redirect-tracking-in-firefox/
// [2] https://www.cookiestatus.com/firefox/#other-first-party-storage
// [3] https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Privacy/Redirect_tracking_protection
// [4] https://www.ghacks.net/2020/03/04/firefox-75-will-purge-site-data-if-associated-with-tracking-cookies/
// [5] https://github.com/arkenfox/user.js/issues/1089
//user_pref("privacy.purge_trackers.enabled", true); // DEFAULT

// PREF: Hyperlink Auditing (click tracking).
//user_pref("browser.send_pings", false); // DEFAULT

// PREF: sending additional analytics to web servers
// [1] https://developer.mozilla.org/docs/Web/API/Navigator/sendBeacon
user_pref("beacon.enabled", false);

// PREF: battery status tracking
// Pref remains, but depreciated
// [1] https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API#browser_compatibility
//user_pref("dom.battery.enabled", false);

// PREF: Local Storage Next Generation (LSNG) (DOMStorage) 
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1286798
//user_pref("dom.storage.next_gen", true); // DEFAULT FF92+

// PREF: SameSite Cookies
// [1] https://hacks.mozilla.org/2020/08/changes-to-samesite-cookie-behavior/
// [2] https://web.dev/samesite-cookies-explained/
//user_pref("network.cookie.sameSite.laxByDefault", true);
//user_pref("network.cookie.sameSite.noneRequiresSecure", true);
//user_pref("network.cookie.sameSite.schemeful", true); // DEFAULT 104+

// PREF: WebRTC Global Mute Toggles
//user_pref("privacy.webrtc.globalMuteToggles", true);

/****************************************************************************
 * SECTION: OSCP & CERTS / HPKP (HTTP Public Key Pinning)                   *
****************************************************************************/

// Online Certificate Status Protocol (OCSP)
// OCSP leaks your IP and domains you visit to the CA when OCSP Stapling is not available on visited host
// OCSP is vulnerable to replay attacks when nonce is not configured on the OCSP responder
// OCSP adds latency
// Short-lived certificates are not checked for revocation (security.pki.cert_short_lifetime_in_days, default:10)
// Firefox falls back on plain OCSP when must-staple is not configured on the host certificate
// [1] https://scotthelme.co.uk/revocation-is-broken/
// [2] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/

// PREF: disable OCSP fetching to confirm current validity of certificates
// OCSP (non-stapled) leaks information about the sites you visit to the CA (cert authority)
// It's a trade-off between security (checking) and privacy (leaking info to the CA)
// Unlike Chrome, Firefox’s default settings also query OCSP responders to confirm the validity
// of SSL/TLS certificates. However, because OCSP query failures are so common, Firefox
// (like other browsers) implements a “soft-fail” policy
// [NOTE] This pref only controls OCSP fetching and does not affect OCSP stapling
// [SETTING] Privacy & Security>Security>Certificates>Query OCSP responder servers...
// [1] https://en.wikipedia.org/wiki/Ocsp
// [2] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
// 0=disabled, 1=enabled (default), 2=enabled for EV certificates only
user_pref("security.OCSP.enabled", 0); // [DEFAULT: 1]

// PREF: set OCSP fetch failures to hard-fail
// When a CA cannot be reached to validate a cert, Firefox just continues the connection (=soft-fail)
// Setting this pref to true tells Firefox to instead terminate the connection (=hard-fail)
// It is pointless to soft-fail when an OCSP fetch fails: you cannot confirm a cert is still valid (it
// could have been revoked) and/or you could be under attack (e.g. malicious blocking of OCSP servers)
// [WARNING] Expect breakage:
// security.OCSP.require will make the connection fail when the OCSP responder is unavailable
// security.OCSP.require is known to break browsing on some captive portals
// [1] https://blog.mozilla.org/security/2013/07/29/ocsp-stapling-in-firefox/
// [2] https://www.imperialviolet.org/2014/04/19/revchecking.html
// [3] https://www.ssl.com/blogs/how-do-browsers-handle-revoked-ssl-tls-certificates/#ftoc-heading-3
//user_pref("security.OCSP.require", true);
      
// PREF: enable CRLite
// CRLite covers valid certs, and it doesn't fall back to OCSP in mode 2 [FF84+]
// 0 = disabled
// 1 = consult CRLite but only collect telemetry
// 2 = consult CRLite and enforce both "Revoked" and "Not Revoked" results
// 3 = consult CRLite and enforce "Not Revoked" results, but defer to OCSP for "Revoked" [FF99+, default FF100+]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1429800,1670985,1753071
// [2] https://blog.mozilla.org/security/tag/crlite/
user_pref("security.remote_settings.crlite_filters.enabled", true);
user_pref("security.pki.crlite_mode", 2);

// PREF: enable strict pinning
// PKP (Public Key Pinning) 0=disabled, 1=allow user MiTM (such as your antivirus), 2=strict
// If you rely on an AV (antivirus) to protect your web browsing
// by inspecting ALL your web traffic, then leave at current default=1
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/16206
user_pref("security.cert_pinning.enforcement_level", 2);

// PREF: disable Enterprise Root Certificates of the operating system
//user_pref("security.enterprise_roots.enabled", false); // DEFAULT
    //user_pref("security.certerrors.mitm.auto_enable_enterprise_roots", false);

/****************************************************************************
 * SECTION: SSL (Secure Sockets Layer) / TLS (Transport Layer Security)    *
****************************************************************************/

// PREF: display warning on the padlock for "broken security"
// Bug: warning padlock not indicated for subresources on a secure page! [2]
// [TEST] (January 2022) https://www.unibs.it/it
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://bugzilla.mozilla.org/1353705
user_pref("security.ssl.treat_unsafe_negotiation_as_broken", true);

// PREF: require safe negotiation
// Blocks connections (SSL_ERROR_UNSAFE_NEGOTIATION) to servers that don't support RFC 5746 [2]
// as they're potentially vulnerable to a MiTM attack [3]. A server without RFC 5746 can be
// safe from the attack if it disables renegotiations but the problem is that the browser can't
// know that. Setting this pref to true is the only way for the browser to ensure there will be
// no unsafe renegotiations on the channel between the browser and the server.
// [STATS] SSL Labs (Sept 2022) reports that over 99.3% of top sites have secure renegotiation [4]
// [1] https://wiki.mozilla.org/Security:Renegotiation
// [2] https://datatracker.ietf.org/doc/html/rfc5746
// [3] https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-3555
// [4] https://www.ssllabs.com/ssl-pulse/
//user_pref("security.ssl.require_safe_negotiation", true);

// PREF: display advanced information on Insecure Connection warning pages
// only works when it's possible to add an exception
// i.e. it doesn't work for HSTS discrepancies (https://subdomain.preloaded-hsts.badssl.com/)
// [TEST] https://expired.badssl.com/
user_pref("browser.xul.error_pages.expert_bad_cert", true);

// PREF: control "Add Security Exception" dialog on SSL warnings
// [NOTE] the code behind this was removed in FF68 [2]
// 0=do neither, 1=pre-populate url, 2=pre-populate url + pre-fetch cert (default)
// [1] https://github.com/pyllyukko/user.js/issues/210
// [2] https://bugzilla.mozilla.org/show_bug.cgi?id=1530348
//user_pref("browser.ssl_override_behavior", 1);

// PREF: disable TLS 1.3 0-RTT (round-trip time) [FF51+]
// This data is not forward secret, as it is encrypted solely under keys derived using
// the offered PSK. There are no guarantees of non-replay between connections
// [1] https://github.com/tlswg/tls13-spec/issues/1001
// [2] https://www.rfc-editor.org/rfc/rfc9001.html#name-replay-attacks-with-0-rtt
// [3] https://blog.cloudflare.com/tls-1-3-overview-and-q-and-a/
user_pref("security.tls.enable_0rtt_data", false); // disable 0 RTT to improve tls 1.3 security

/****************************************************************************
 * SECTION: FONTS                                                          *
****************************************************************************/

// PREF: disable rendering of SVG OpenType fonts
// [1] https://github.com/arkenfox/user.js/issues/1529
//user_pref("gfx.font_rendering.opentype_svg.enabled", false);

// PREF: limit font visibility (Windows, Mac, some Linux) [FF94+]
// Uses hardcoded lists with two parts: kBaseFonts + kLangPackFonts [1], bundled fonts are auto-allowed
// In Normal windows: uses the first applicable: RFP (4506) over TP over Standard
// In Private Browsing windows: uses the most restrictive between normal and private
// 1=only base system fonts, 2=also fonts from optional language packs, 3=also user-installed fonts
// [1] https://searchfox.org/mozilla-central/search?path=StandardFonts*.inc
//user_pref("layout.css.font-visibility.standard", 1); // Normal Browsing windows with tracking protection disabled(?)
user_pref("layout.css.font-visibility.trackingprotection", 1); // Normal Browsing windows with tracking protection enabled
user_pref("layout.css.font-visibility.private", 1); // Private Browsing windows
//user_pref("layout.css.font-visibility.resistFingerprinting", 1); // DEFAULT

/****************************************************************************
 * SECTION: RESIST FINGERPRINTING (RFP)                                     *
****************************************************************************/

// PREF: enable advanced fingerprinting protection 
// [WARNING] Leave disabled unless you're okay with all the drawbacks
// [1] https://librewolf.net/docs/faq/#what-are-the-most-common-downsides-of-rfp-resist-fingerprinting
// [2] https://old.reddit.com/r/firefox/comments/wuqpgi/comment/ile3whx/?context=3
//user_pref("privacy.resistFingerprinting", true);

// PREF: set new window size rounding max values [FF55+]
// [SETUP-CHROME] sizes round down in hundreds: width to 200s and height to 100s, to fit your screen
// [1] https://bugzilla.mozilla.org/1330882
//user_pref("privacy.window.maxInnerWidth", 1600);
//user_pref("privacy.window.maxInnerHeight", 900);

// PREF: disable showing about:blank as soon as possible during startup [FF60+]
// When default true this no longer masks the RFP chrome resizing activity
// [1] https://bugzilla.mozilla.org/1448423
//user_pref("browser.startup.blankWindow", false);

// PREF: disable using system colors
// [SETTING] General>Language and Appearance>Fonts and Colors>Colors>Use system colors
//user_pref("browser.display.use_system_colors", false); // [DEFAULT false NON-WINDOWS]

// PREF: enforce non-native widget theme
// Security: removes/reduces system API calls, e.g. win32k API [1]
// Fingerprinting: provides a uniform look and feel across platforms [2]
// [1] https://bugzilla.mozilla.org/1381938
// [2] https://bugzilla.mozilla.org/1411425
//user_pref("widget.non-native-theme.enabled", true); // [DEFAULT: true]

/****************************************************************************
 * SECTION: DISK AVOIDANCE                                                 *
****************************************************************************/

// PREF: disable disk cache
// [NOTE] If you're thinking it would be more efficient to keep the browser cache instead of
// having to re-download objects for the websites you visit frequently, you're right;
// however doing so can compromise your privacy.
// [NOTE] If you think disk cache helps performance, then feel free to override this.
user_pref("browser.cache.disk.enable", false);

// PREF: disable media cache from writing to disk in Private Browsing
// [NOTE] MSE (Media Source Extensions) are already stored in-memory in PB
user_pref("browser.privatebrowsing.forceMediaMemoryCache", true);
user_pref("media.memory_cache_max_size", 65536); // 8x default size of 8192 [performance enhancement]

// PREF: disable storing extra session data
// Dictates whether sites may save extra session data such as form content, cookies and POST data
// 0=everywhere, 1=unencrypted sites, 2=nowhere
user_pref("browser.sessionstore.privacy_level", 2);

// PREF: disable fetching and permanently storing favicons for Windows .URL shortcuts created by drag and drop
// [NOTE] .URL shortcut files will be created with a generic icon
// Favicons are stored as .ico files in $profile_dir\shortcutCache
//user_pref("browser.shell.shortcutFavicons", false);

// PREF: disable page thumbnails capturing
user_pref("browser.pagethumbnails.capturing_disabled", true); // [depreciated?]

// PREF: disable automatic Firefox start and session restore after reboot [WINDOWS]
// [1] https://bugzilla.mozilla.org/603903
//user_pref("toolkit.winRegisterApplicationRestart", false);

// PREF: increase media cache limits
// For higher-end PCs; helps with video playback/buffering
//user_pref("browser.cache.memory.capacity",    256000); // -1; 256000=256MB, 512000=512MB, 1024000=1GB
//user_pref("media.cache_readahead_limit",      99999); // 60
//user_pref("media.cache_resume_threshold",     99999); // 30
//user_pref("media.cache_size",                 2048000); // 512000
//user_pref("media.memory_cache_max_size",      512000); // 65536
//user_pref("media.memory_caches_combined_limit_kb", 2560000); // 524288

/******************************************************************************
 * SECTION: CLEARING DATA DEFAULTS                           *
******************************************************************************/

// PREF: reset default 'Time range to clear' for 'Clear Recent History'.
// Firefox remembers your last choice. This will reset the value when you start Firefox.
// 0=everything, 1=last hour, 2=last two hours, 3=last four hours,
// 4=today, 5=last five minutes, 6=last twenty-four hours
// The values 5 + 6 are not listed in the dropdown, which will display a
// blank value if they are used, but they do work as advertised.
//user_pref("privacy.sanitize.timeSpan", 0);

// PREF: reset default items to clear with Ctrl-Shift-Del
// This dialog can also be accessed from the menu History>Clear Recent History
// Firefox remembers your last choices. This will reset them when you start Firefox.
// Regardless of what you set privacy.cpd.downloads to, as soon as the dialog
// for "Clear Recent History" is opened, it is synced to the same as 'history'.
//user_pref("privacy.cpd.history", true); // Browsing & Download History [DEFAULT]
//user_pref("privacy.cpd.formdata", true); // Form & Search History [DEFAULT]
//user_pref("privacy.cpd.cache", true); // Cache [DEFAULT]
//user_pref("privacy.cpd.cookies", true); // Cookies [DEFAULT]
//user_pref("privacy.cpd.sessions", false); // Active Logins [DEFAULT]
//user_pref("privacy.cpd.offlineApps", false); // Offline Website Data [DEFAULT]
//user_pref("privacy.cpd.siteSettings", false); // Site Preferences [DEFAULT]

/******************************************************************************
 * SECTION: SHUTDOWN & SANITIZING                           *
******************************************************************************/

// PREF: set History section to show all options
// Settings>Privacy>History>Use custom settings for history
// [INFOGRAPHIC] https://bugzilla.mozilla.org/show_bug.cgi?id=1765533#c1
user_pref("privacy.history.custom", true);

// PREF: clear browsing data on shutdown, while respecting site exceptions
// Set cookies, site data, cache, etc. to clear on shutdown
// [SETTING] Privacy & Security>History>Custom Settings>Clear history when Firefox closes>Settings
// [NOTE] "sessions": Active Logins: refers to HTTP Basic Authentication [1], not logins via cookies
// [NOTE] "offlineApps": Offline Website Data: localStorage, service worker cache, QuotaManager (IndexedDB, asm-cache)
// Clearing "offlineApps" may affect login items after browser restart [2]
// [1] https://en.wikipedia.org/wiki/Basic_access_authentication
// [2] https://github.com/arkenfox/user.js/issues/1291
//user_pref("privacy.sanitize.sanitizeOnShutdown", true);

// Uncomment individual prefs to disable clearing on shutdown:
// [NOTE] If "history" is true, downloads will also be cleared
//user_pref("privacy.clearOnShutdown.history", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.formdata", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.sessions", true); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.offlineApps", false); // [DEFAULT]
//user_pref("privacy.clearOnShutdown.siteSettings", false); // [DEFAULT]

// PREF: configure site exceptions
// [NOTE] Currently, there is no way to add sites via about:config
// [SETTING] to manage site exceptions: Options>Privacy & Security>Cookies & Site Data>Manage Exceptions
// [SETTING] to add site exceptions: Ctrl+I>Permissions>Cookies>Allow (when on the website in question)
// For cross-domain logins, add exceptions for both sites:
// e.g. https://www.youtube.com (site) + https://accounts.google.com (single sign on)
// [WARNING] Be selective with what cookies you keep, as they also disable partitioning [1]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1767271

/******************************************************************************
 * SECTION: SPECULATIVE CONNECTIONS                           *
******************************************************************************/

// PREF: New tab preload
// [WARNING] Disabling this may cause a delay when opening a new tab in Firefox
// [1] https://wiki.mozilla.org/Tiles/Technical_Documentation#Ping
// [2] https://github.com/arkenfox/user.js/issues/1556
//user_pref("browser.newtab.preload", false);

// PREF: Speculative connections on New Tab page
// Firefox will open predictive connections to sites when the user hovers their mouse over thumbnails
// on the New Tab Page or the user starts to search in the Search Bar, or in the search field on the
// New Tab Page. In case the user follows through with the action, the page can begin loading faster
// since some of the work was already started in advance.
// [NOTE] TCP and SSL handshakes are set up in advance but page contents are not downloaded until a click on the link is registered
// [1] https://support.mozilla.org/en-US/kb/how-stop-firefox-making-automatic-connections?redirectslug=how-stop-firefox-automatically-making-connections&redirectlocale=en-US#:~:text=Speculative%20pre%2Dconnections
// [2] https://news.slashdot.org/story/15/08/14/2321202/how-to-quash-firefoxs-silent-requests
// [3] https://www.keycdn.com/blog/resource-hints#prefetch
// [4] https://3perf.com/blog/link-rels/#prefetch
user_pref("network.http.speculative-parallel-limit", 0);

// PREF: DNS pre-resolve <link rel="dns-prefetch">
// Resolve hostnames ahead of time, to avoid DNS latency.
// In order to reduce latency, Firefox will proactively perform domain name resolution on links that
// the user may choose to follow as well as URLs for items referenced by elements in a web page.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
// [2] https://css-tricks.com/prefetching-preloading-prebrowsing/#dns-prefetching
// [3] https://www.keycdn.com/blog/resource-hints#2-dns-prefetching
// [4] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
user_pref("network.dns.disablePrefetch", true);
//user_pref("network.dns.disablePrefetchFromHTTPS", true); // DEFAULT

// PREF: Preload <link rel=preload>
// This tells the browser that the resource should be loaded as part of the current navigation
// and it should start fetching it ASAP. This attribute can be applied to CSS, fonts, images, JavaScript files and more.
// This tells the browser to download and cache a resource (like a script or a stylesheet) as soon as possible.
// The browser doesn’t do anything with the resource after downloading it. Scripts aren’t executed, stylesheets
// aren’t applied. It’s just cached – so that when something else needs it, it’s available immediately.
// Focuses on fetching a resource for the CURRENT navigation.
// [NOTE] Unlike other pre-connection tags (except modulepreload), this tag is mandatory for the browser.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload
// [2] https://w3c.github.io/preload/
// [3] https://3perf.com/blog/link-rels/#preload
// [4] https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf
// [5] https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/#how-can-preload-do-better
// [6] https://www.keycdn.com/blog/resource-hints#preload
// [7] https://github.com/arkenfox/user.js/issues/1098#issue-791949341
// [8] https://yashints.dev/blog/2018/10/06/web-perf-2#preload
// [9] https://web.dev/preload-critical-assets/
//user_pref("network.preload", true); // DEFAULT

// PREF: Preconnect to the autocomplete URL in the address bar
// Firefox preloads URLs that autocomplete when a user types into the address bar.
// Connects to destination server ahead of time, to avoid TCP handshake latency.
// [NOTE] Firefox will perform DNS lookup (if enabled) and TCP and TLS handshake,
// but will not start sending or receiving HTTP data.
// [1] https://www.ghacks.net/2017/07/24/disable-preloading-firefox-autocomplete-urls/
user_pref("browser.urlbar.speculativeConnect.enabled", false);

// PREF: disable mousedown speculative connections on bookmarks and history
user_pref("browser.places.speculativeConnect.enabled", false);

// PREF: Link prefetching <link rel="prefetch">
// Firefox will prefetch certain links if any of the websites you are viewing uses the special prefetch-link tag.
// A directive that tells a browser to fetch a resource that will likely be needed for the next navigation.
// The resource will be fetched with extremely low priority (since everything the browser knows
// is needed in the current page is more important than a resource that we guess might be needed in the next one).
// Speeds up the NEXT navigation rather than the current one.
// When the user clicks on a link, or initiates any kind of page load, link prefetching will stop and any prefetch hints will be discarded.
// [1] https://developer.mozilla.org/en-US/docs/Web/HTTP/Link_prefetching_FAQ#Privacy_implications
// [2] http://www.mecs-press.org/ijieeb/ijieeb-v7-n5/IJIEEB-V7-N5-2.pdf
// [3] https://timkadlec.com/remembers/2020-06-17-prefetching-at-this-age/
// [4] https://3perf.com/blog/link-rels/#prefetch
user_pref("network.prefetch-next", false);

// PREF: Network Predictor (NP)
// Keeps track of components that were loaded during page visits so that the browser knows next time
// which resources to request from the server: It uses a local file to remember which resources were
// needed when the user visits a webpage (such as image.jpg and script.js), so that the next time the
// user prepares to go to that webpage (upon navigation? URL bar? mouseover?), this history can be used
// to predict what resources will be needed rather than wait for the document to link those resources.
/// NP only performs pre-connect, not prefetch, by default, including DNS pre-resolve and TCP preconnect
// (which includes SSL handshake). No data is actually sent to the site until a user actively clicks
// a link. However, NP is still opening TCP connections and doing SSL handshakes, so there is still
// information leakage about your browsing patterns. This isn't desirable from a privacy perspective.
// [NOTE] Disabling DNS prefetching disables the DNS prefetching behavior of NP
// [1] https://wiki.mozilla.org/Privacy/Reviews/Necko
// [2] https://www.ghacks.net/2014/05/11/seer-disable-firefox/
// [3] https://github.com/dillbyrne/random-agent-spoofer/issues/238#issuecomment-110214518
// [4] https://www.igvita.com/posa/high-performance-networking-in-google-chrome/#predictor
user_pref("network.predictor.enabled", false);

// PREF: NP fetches resources on the page ahead of time, to accelerate rendering of the page
// Performs both pre-connect and prefetch
user_pref("network.predictor.enable-prefetch", false);

// PREF: NP activates upon hovered links:
// The next time the user mouseovers a link to that webpage, history is used to predict what
// resources will be needed rather than wait for the document to link those resources.
// When you hover over links, connections are established to linked domains and servers
// automatically to speed up the loading process should you click on the link. To improve the
// loading speed, Firefox will open predictive connections to sites when the user hovers their
// mouse over. In case the user follows through with the action, the page can begin loading
// faster since some of the work was already started in advance. Focuses on fetching a resource
// for the NEXT navigation.
user_pref("network.predictor.enable-hover-on-ssl", false); // DEFAULT

/******************************************************************************
 * SECTION: SEARCH / URL BAR                              *
******************************************************************************/

// PREF: do not trim certain parts of the URL
// [1] https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference/browser.urlbar.trimURLs#values
//user_pref("browser.urlbar.trimURLs", false);

// PREF: enable a seperate search engine for Private Windows
// [SETTINGS] Preferences -> Search and select another search provider (like DuckDuckGo)
user_pref("browser.search.separatePrivateDefault", true);
user_pref("browser.search.separatePrivateDefault.ui.enabled", true);

// PREF: enable option to add custom search
// [SETTINGS] Settings -> Search -> Search Shortcuts -> Add
// [EXAMPLE] https://lite.duckduckgo.com/lite/?q=%s
// [1] https://reddit.com/r/firefox/comments/xkzswb/adding_firefox_search_engine_manually/
user_pref("browser.urlbar.update2.engineAliasRefresh", true); // HIDDEN

// PREF: disable live search engine suggestions (Google, Bing, etc.)
// [WARNING] Search engines keylog every character you type from the URL bar
user_pref("browser.search.suggest.enabled", false);
//user_pref("browser.search.suggest.enabled.private", false); // DEFAULT

// PREF: disable location bar leaking single words to a DNS provider after searching
// 0=never resolve single words, 1=heuristic (default), 2=always resolve
// [1] https://bugzilla.mozilla.org/1642623
//user_pref("browser.urlbar.dnsResolveSingleWordsAfterSearch", 0); // DEFAULT FF104+

// PREF: disable Firefox Suggest
// [1] https://github.com/arkenfox/user.js/issues/1257
//user_pref("browser.urlbar.quicksuggest.enabled", false); // controls whether the UI is shown
user_pref("browser.urlbar.suggest.quicksuggest.sponsored", false);
user_pref("browser.urlbar.suggest.quicksuggest.nonsponsored", false);
    //user_pref("browser.urlbar.groupLabels.enabled", false);

// PREF: URL bar domain guessing
// Domain guessing intercepts DNS "hostname not found errors" and resends a
// request (e.g. by adding www or .com). This is inconsistent use (e.g. FQDNs), does not work
// via Proxy Servers (different error), is a flawed use of DNS (TLDs: why treat .com
// as the 411 for DNS errors?), privacy issues (why connect to sites you didn't
// intend to), can leak sensitive data (e.g. query strings: e.g. Princeton attack),
// and is a security risk (e.g. common typos & malicious sites set up to exploit this).
//user_pref("browser.fixup.alternate.enabled", false); // [DEFAULT FF104+]

// PREF: display "Not Secure" text on HTTP sites
// No longer needed with HTTPS-Only
//user_pref("security.insecure_connection_text.enabled", true);
//user_pref("security.insecure_connection_text.pbmode.enabled", true);

// PREF: Disable location bar autofill
// https://support.mozilla.org/en-US/kb/address-bar-autocomplete-firefox#w_url-autocomplete
//user_pref("browser.urlbar.autoFill", false);

// PREF: Enforce Punycode for Internationalized Domain Names to eliminate possible spoofing
// Firefox has some protections, but it is better to be safe than sorry.
// [!] Might be undesirable for non-latin alphabet users since legitimate IDN's are also punycoded.
// [TEST] https://www.xn--80ak6aa92e.com/ (www.apple.com)
// [1] https://wiki.mozilla.org/IDN_Display_Algorithm
// [2] https://en.wikipedia.org/wiki/IDN_homograph_attack
// [3] CVE-2017-5383: https://www.mozilla.org/security/advisories/mfsa2017-02/
// [4] https://www.xudongz.com/blog/2017/idn-phishing/
user_pref("network.IDN_show_punycode", true);

/******************************************************************************
 * SECTION: HTTPS-FIRST POLICY                          *
******************************************************************************/

// PREF: HTTPS-First Policy
// Firefox attempts to make all connections to websites secure, and falls back to insecure
// connections only when a website does not support it. Unlike HTTPS-Only Mode, Firefox
// will NOT ask for your permission before connecting to a website that doesn’t support secure connections.
// [NOTE] HTTPS-Only Mode needs to be disabled for HTTPS First to work.
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1706552
// [2] https://web.dev/why-https-matters/
// [3] https://www.cloudflare.com/learning/ssl/why-use-https/
//user_pref("dom.security.https_first", true);
//user_pref("dom.security.https_first_pbm", true); // default

/******************************************************************************
 * SECTION: HTTPS-ONLY MODE                              *
******************************************************************************/

// Firefox displays a warning page if HTTPS is not supported by a server. Options to use HTTP are then provided.
// [NOTE] When "https_only_mode" (all windows) is true, "https_only_mode_pbm" (private windows only) is ignored.
// [SETTING] to add site exceptions: Padlock>HTTPS-Only mode>On/Off/Off temporarily
// [SETTING] Privacy & Security>HTTPS-Only Mode
// [TEST] http://example.com [upgrade]
// [TEST] http://httpforever.com/ [no upgrade]
// [TEST] http://speedofanimals.com [no upgrade]
// [1] https://bugzilla.mozilla.org/1613063
// [2] https://blog.mozilla.org/security/2020/11/17/firefox-83-introduces-https-only-mode/
// [3] https://web.dev/why-https-matters/
// [4] https://www.cloudflare.com/learning/ssl/why-use-https/

// PREF: enable HTTPS-only Mode
user_pref("dom.security.https_only_mode", true);

// PREF: Offer suggestion for HTTPS site when available
// [1] https://nitter.winscloud.net/leli_gibts_scho/status/1371458534186057731
user_pref("dom.security.https_only_mode_error_page_user_suggestions", true);

// PREF: HTTP background requests in HTTPS-only Mode
// When attempting to upgrade, if the server doesn't respond within 3 seconds[=default time],
// Firefox sends HTTP requests in order to check if the server supports HTTPS or not.
// This is done to avoid waiting for a timeout which takes 90 seconds.
// Firefox only sends top level domain when falling back to http.
// [WARNING] Disabling causes long timeouts when no path to HTTPS is present.
// [NOTE] Use "Manage Exceptions" for sites known for no HTTPS. 
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1642387,1660945
// [2] https://blog.mozilla.org/attack-and-defense/2021/03/10/insights-into-https-only-mode/
//user_pref("dom.security.https_only_mode_send_http_background_request", true); // DEFAULT
         //user_pref("dom.security.https_only_fire_http_request_background_timer_ms", 1250); // default=3000

// PREF: Enable HTTPS-Only mode for local resources
//user_pref("dom.security.https_only_mode.upgrade_local", true);

/******************************************************************************
 * SECTION: DNS-over-HTTPS                                                    *
******************************************************************************/

// PREF: DNS-over-HTTPS (DoH) mode
// Mozilla uses Cloudfare by default. NextDNS is also an option.
// [NOTE] You can set this to 0 if you are already using secure DNS for your entire network (e.g. OS-level, router-level).
// [1] https://hacks.mozilla.org/2018/05/a-cartoon-intro-to-dns-over-https/
// [2] https://www.internetsociety.org/blog/2018/12/dns-privacy-support-in-mozilla-firefox/
// 0=off, 2=TRR preferred, 3=TRR only, 5=TRR disabled
//user_pref("network.trr.mode", 2); // enable TRR (with System fallback)
//user_pref("network.trr.mode", 3); // enable TRR (without System fallback)

// PREF: DoH resolver
// You will type between the "" for both prefs.
// I recommend creating your own URI with NextDNS for both privacy and security.
// https://nextdns.io
// [1] https://github.com/uBlockOrigin/uBlock-issues/issues/1710
//user_pref("network.trr.uri", "https://xxxx/dns-query");
//user_pref("network.trr.custom_uri", "https://xxxx/dns-query");
//user_pref("network.dns.skipTRR-when-parental-control-enabled", false);

// PREF: enable Oblivious DoH
// [1] https://blog.cloudflare.com/oblivious-dns/
// [2] https://www.reddit.com/r/firefox/comments/xc9y4g/how_to_enable_oblivious_doh_odoh_for_enhanced_dns/
//user_pref("network.trr.mode", 3);
//user_pref("network.trr.odoh.enabled", true);
//user_pref("network.trr.odoh.configs_uri", "https://odoh.cloudflare-dns.com/.well-known/odohconfigs");
//user_pref("network.trr.odoh.target_host", "https://odoh.cloudflare-dns.com/");
//user_pref("network.trr.odoh.target_path", "dns-query");
//user_pref("network.trr.odoh.proxy_uri", "https://odoh1.surfdomeinen.nl/proxy");

// PREF: DoH resolver list
// [EXAMPLE] "[{ \"name\": \"Cloudflare\", \"url\": \"https://mozilla.cloudflare-dns.com/dns-query\" },{ \"name\": \"NextDNS\", \"url\": \"https://trr.dns.nextdns.io/\" }]"
//user_pref("network.trr.resolvers", "[{ \"name\": \"<NAME1>\", \"url\": \"https://<URL1>\" }, { \"name\": \"<NAME2>\", \"url\": \"https://<URL2>\" }]");
//user_pref("network.trr.resolvers", "[{ \"name\": \"<NextDNS Custom>\", \"url\": \"https://dns.nextdns.io/7ad2e5/FF_WINDOWS\" }]");

// PREF: Temporary workaround for DNS leak with DOH active [NO LONGER NEEDED]
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1730418
//user_pref("network.dns.upgrade_with_https_rr", false);

/******************************************************************************
 * SECTION: ESNI / ECH                            *
******************************************************************************/

// PREF: enable Encrypted Client Hello (ECH)
// [1] https://blog.cloudflare.com/encrypted-client-hello/
// [2] https://www.youtube.com/watch?v=tfyrVYqXQRE
//user_pref("network.dns.echconfig.enabled", true);
//user_pref("network.dns.use_https_rr_as_altsvc", true); // DEFAULT

// PREF: disable HTTP Alternative Services [FF37+]
// [WHY] Already isolated by network partitioning (FF85+)
//user_pref("network.http.altsvc.enabled", false);
//user_pref("network.http.altsvc.oe", false);

/******************************************************************************
 * SECTION: PROXY / SOCKS / IPv6                           *
******************************************************************************/

// PREF: disable IPv6
// IPv6 can be abused, especially with MAC addresses, and can leak with VPNs: assuming
// your ISP and/or router and/or website is IPv6 capable. Most sites will fall back to IPv4
// [STATS] Firefox telemetry (Sept 2022) shows ~8% of all successful connections are IPv6
// [NOTE] This is an application level fallback. Disabling IPv6 is best done at an
// OS/network level, and/or configured properly in VPN setups. If you are not masking your IP,
// then this won't make much difference. If you are masking your IP, then it can only help.
// [NOTE] However, many VPN options now provide IPv6 coverage.
// [NOTE] PHP defaults to IPv6 with "localhost". Use "php -S 127.0.0.1:PORT"
// [TEST] https://ipleak.org/
// [1] https://www.internetsociety.org/tag/ipv6-security/ (Myths 2,4,5,6)
//user_pref("network.dns.disableIPv6", true);

// PREF: set the proxy server to do any DNS lookups when using SOCKS
// e.g. in Tor, this stops your local DNS server from knowing your Tor destination
// as a remote Tor node will handle the DNS request
// [1] https://trac.torproject.org/projects/tor/wiki/doc/TorifyHOWTO/WebBrowsers
// [SETTING] Settings>Network Settings>Proxy DNS when using SOCKS v5
user_pref("network.proxy.socks_remote_dns", true);

// PREF: disable using UNC (Uniform Naming Convention) paths [FF61+]
// [SETUP-CHROME] Can break extensions for profiles on network shares
// [1] https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/26424
user_pref("network.file.disable_unc_paths", true); // [HIDDEN PREF]

// PREF: disable GIO as a potential proxy bypass vector
// Gvfs/GIO has a set of supported protocols like obex, network, archive, computer,
// dav, cdda, gphoto2, trash, etc. By default only sftp is accepted (FF87+)
// [1] https://bugzilla.mozilla.org/1433507
// [2] https://en.wikipedia.org/wiki/GVfs
// [3] https://en.wikipedia.org/wiki/GIO_(software)
user_pref("network.gio.supported-protocols", ""); // [HIDDEN PREF]

/******************************************************************************
 * SECTION: PASSWORDS                             *
******************************************************************************/

// PREF: disable formless login capture
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1166947
user_pref("signon.formlessCapture.enabled", false);

// PREF: disable capturing credentials in private browsing
user_pref("signon.privateBrowsingCapture.enabled", false);

// PREF: disable auto-filling username & password form fields
// Can leak in cross-site forms and be spoofed
// NOTE: Username and password is still available when you enter the field
user_pref("signon.autofillForms", false);
//user_pref("signon.autofillForms.autocompleteOff", true);
//user_pref("signon.showAutoCompleteOrigins", false);

// PREF: disable autofilling saved passwords on HTTP pages and show warning
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1217152,1319119
//user_pref("signon.autofillForms.http", false);
//user_pref("security.insecure_field_warning.contextual.enabled", true);

// PREF: disable password manager
// [NOTE] This does not clear any passwords already saved
user_pref("signon.rememberSignons", false);
//user_pref("signon.rememberSignons.visibilityToggle", false);
//user_pref("signon.schemeUpgrades", false);
//user_pref("signon.showAutoCompleteFooter", false);
//user_pref("signon.autologin.proxy", false);
    //user_pref("signon.debug", false);

// PREF: disable Firefox built-in password generator
// Create passwords with random characters and numbers.
// [NOTE] Doesn't work with Lockwise disabled!
// [1] https://wiki.mozilla.org/Toolkit:Password_Manager/Password_Generation
//user_pref("signon.generation.available", false);
//user_pref("signon.generation.enabled", false);

// PREF: disable Firefox Lockwise (about:logins)
// [NOTE] No usernames or passwords are sent to third-party sites
// [1] https://lockwise.firefox.com/
// [2] https://support.mozilla.org/en-US/kb/firefox-lockwise-managing-account-data
// user_pref("signon.management.page.breach-alerts.enabled", false); 
    //user_pref("signon.management.page.breachAlertUrl", "");
// user_pref("browser.contentblocking.report.lockwise.enabled", false);
    //user_pref("browser.contentblocking.report.lockwise.how_it_works.url", "");

// PREF: disable Firefox import password from signons.sqlite file
// [1] https://support.mozilla.org/en-US/questions/1020818
//user_pref("signon.management.page.fileImport.enabled", false);
//user_pref("signon.importedFromSqlite", false);
    //user_pref("signon.recipes.path", "");

// PREF: disable websites autocomplete
// Don't let sites dictate use of saved logins and passwords. 
//user_pref("signon.storeWhenAutocompleteOff", false);

// PREF: disable Firefox Monitor
//user_pref("extensions.fxmonitor.enabled", false);
      
// PREF: enable native password manager [OVERRIDE]
user_pref("signon.rememberSignons", true);
user_pref("signon.autofillForms", true);
user_pref("browser.formfill.enable", true);
// enable autofill on page load:
//user_pref("signon.autofillForms.autocompleteOff", false);
//user_pref("signon.showAutoCompleteOrigins", true);

/****************************************************************************
 * SECTION: ADDRESS + CREDIT CARD MANAGER                                   *
****************************************************************************/

// PREF: Disable Form Autofill
// NOTE: stored data is not secure (uses a JSON file)
// [1] https://wiki.mozilla.org/Firefox/Features/Form_Autofill
// [2] https://www.ghacks.net/2017/05/24/firefoxs-new-form-autofill-is-awesome
user_pref("extensions.formautofill.addresses.enabled", false);
user_pref("extensions.formautofill.creditCards.enabled", false);
user_pref("extensions.formautofill.heuristics.enabled", false);
user_pref("browser.formfill.enable", false);

/******************************************************************************
 * SECTION: MIXED CONTENT + CROSS-SITE                             *
******************************************************************************/

// PREF: limit (or disable) HTTP authentication credentials dialogs triggered by sub-resources
// Hardens against potential credentials phishing
// 0=don't allow sub-resources to open HTTP authentication credentials dialogs
// 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
// 2=allow sub-resources to open HTTP authentication credentials dialogs (default)
// [1] https://www.fxsitecompat.com/en-CA/docs/2015/http-auth-dialog-can-no-longer-be-triggered-by-cross-origin-resources/
user_pref("network.auth.subresource-http-auth-allow", 1);

// PREF: disable automatic authentication on Microsoft sites [WINDOWS]
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1695693,1719301
//user_pref("network.http.windows-sso.enabled", false);

// PREF: block insecure active content (scripts) on HTTPS pages.
// [1] https://trac.torproject.org/projects/tor/ticket/21323
//user_pref("security.mixed_content.block_active_content", true); // DEFAULT

// PREF: block insecure passive content (images) on HTTPS pages
//user_pref("security.mixed_content.block_display_content", true);

// PREF: upgrade passive content to use HTTPS on secure pages
//user_pref("security.mixed_content.upgrade_display_content", true);

// PREF: block insecure downloads from secure sites
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1660952
//user_pref("dom.block_download_insecure", true); // DEFAULT

// PREF: allow PDFs to load javascript
// https://www.reddit.com/r/uBlockOrigin/comments/mulc86/firefox_88_now_supports_javascript_in_pdf_files/
user_pref("pdfjs.enableScripting", false);

// PREF: disable bypassing 3rd party extension install prompts
// [1] https://bugzilla.mozilla.org/buglist.cgi?bug_id=1659530,1681331
user_pref("extensions.postDownloadThirdPartyPrompt", false);

// PREF: disable permissions delegation
// Currently applies to cross-origin geolocation, camera, mic and screen-sharing
// permissions, and fullscreen requests. Disabling delegation means any prompts
// for these will show/use their correct 3rd party origin
// [1] https://groups.google.com/forum/#!topic/mozilla.dev.platform/BdFOMAuCGW8/discussion
user_pref("permissions.delegation.enabled", false);

// PREF: enforce TLS 1.0 and 1.1 downgrades as session only
//user_pref("security.tls.version.enable-deprecated", false); // DEFAULT

// PREF: enable (limited but sufficient) window.opener protection
// Makes rel=noopener implicit for target=_blank in anchor and area elements when no rel attribute is set.
// https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
//user_pref("dom.targetBlankNoOpener.enabled", true); // DEFAULT

// PREF: enable "window.name" protection
// If a new page from another domain is loaded into a tab, then window.name is set to an empty string. The original
// string is restored if the tab reverts back to the original page. This change prevents some cross-site attacks.
//user_pref("privacy.window.name.update.enabled", true); // DEFAULT

/******************************************************************************
 * SECTION: HEADERS / REFERERS                                             *
******************************************************************************/

// PREF: Set the default Referrer Policy; to be used unless overriden by the site.
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade.
// [TEST https://www.sportskeeda.com/mma/news-joe-rogan-accuses-cnn-altering-video-color-make-look-sick
// [1] https://blog.mozilla.org/security/2021/03/22/firefox-87-trims-http-referrers-by-default-to-protect-user-privacy/
// [2] https://web.dev/referrer-best-practices/
// [3] https://plausible.io/blog/referrer-policy
//user_pref("network.http.referer.defaultPolicy", 2); // DEFAULT
//user_pref("network.http.referer.defaultPolicy.pbmode", 2); // DEFAULT

// PREF: Set the default Referrer Policy applied to third-party trackers when the
// default cookie policy is set to reject third-party trackers; to be used
// unless overriden by the site
// [NOTE] Trim referrers from trackers to origins by default ***/
// 0=no-referrer, 1=same-origin, 2=strict-origin-when-cross-origin (default),
// 3=no-referrer-when-downgrade.
user_pref("network.http.referer.defaultPolicy.trackers", 1);
user_pref("network.http.referer.defaultPolicy.trackers.pbmode", 1);

// PREF: control when to send a cross-origin referer
// 0=always (default), 1=only if base domains match, 2=only if hosts match
// [NOTE] Known to cause issues with some sites (e.g., Vimeo, iCloud, Instagram) ***/
//user_pref("network.http.referer.XOriginPolicy", 2);

// PREF: control the amount of cross-origin information to send
// 0=send full URI (default), 1=scheme+host+port+path, 2=scheme+host+port ***/
user_pref("network.http.referer.XOriginTrimmingPolicy", 2);

/******************************************************************************
 * SECTION: CONTAINERS                                                        *
******************************************************************************/
// PREF: enable Container Tabs and its UI setting [FF50+]
// [NOTE] No longer a privacy benefit due to Firefox upgrades (see State Partitioning and Network Partitioning)
// Useful if you want to login to the same site under different accounts
// You also may want to download Multi-Account Containers for extra options (2)
// [SETTING] General>Tabs>Enable Container Tabs
// [1] https://wiki.mozilla.org/Security/Contextual_Identity_Project/Containers
// [2] https://addons.mozilla.org/en-US/firefox/addon/multi-account-containers/
user_pref("privacy.userContext.enabled", true);
user_pref("privacy.userContext.ui.enabled", true);

// PREF: set behavior on "+ Tab" button to display container menu on left click [FF74+]
// [NOTE] The menu is always shown on long press and right click
// [SETTING] General>Tabs>Enable Container Tabs>Settings>Select a container for each new tab ***/
//user_pref("privacy.userContext.newTabContainerOnLeftClick.enabled", true);

/******************************************************************************
 * SECTION: WEBRTC                                                            *
******************************************************************************/

// PREF: disable WebRTC (Web Real-Time Communication)
// Firefox uses mDNS hostname obfuscation on desktop (except Windows7/8) and the
// private IP is NEVER exposed, except if required in TRUSTED scenarios; i.e. after
// you grant device (microphone or camera) access
// [SETUP-HARDEN] Test first. Windows7/8 users only: behind a proxy who never use WebRTC
// [TEST] https://browserleaks.com/webrtc
// [1] https://groups.google.com/g/discuss-webrtc/c/6stQXi72BEU/m/2FwZd24UAQAJ
// [2] https://datatracker.ietf.org/doc/html/draft-ietf-mmusic-mdns-ice-candidates#section-3.1.1
//user_pref("media.peerconnection.enabled", false);

// PREF: force WebRTC inside the proxy [FF70+]
user_pref("media.peerconnection.ice.proxy_only_if_behind_proxy", true);

// PREF: force a single network interface for ICE candidates generation [FF42+]
// When using a system-wide proxy, it uses the proxy interface
// [1] https://developer.mozilla.org/en-US/docs/Web/API/RTCIceCandidate
// [2] https://wiki.mozilla.org/Media/WebRTC/Privacy
user_pref("media.peerconnection.ice.default_address_only", true);

// PREF: force exclusion of private IPs from ICE candidates [FF51+]
// [SETUP-HARDEN] This will protect your private IP even in TRUSTED scenarios after you
// grant device access, but often results in breakage on video-conferencing platforms
//user_pref("media.peerconnection.ice.no_host", true);

/******************************************************************************
 * SECTION: PLUGINS                                                           *
******************************************************************************/

// PREF: disable GMP (Gecko Media Plugins)
// [1] https://wiki.mozilla.org/GeckoMediaPlugins
//user_pref("media.gmp-provider.enabled", false);

// PREF: disable widevine CDM (Content Decryption Module)
// [NOTE] This is covered by the EME master switch
//user_pref("media.gmp-widevinecdm.enabled", false);

// PREF: disable all DRM content (EME: Encryption Media Extension)
// EME is a JavaScript API for playing DRMed (not free) video content in HTML.
// A DRM component called a Content Decryption Module (CDM) decrypts, decodes, and displays the video.
// [SETUP-WEB] e.g. Netflix, Amazon Prime, Hulu, HBO, Disney+, Showtime, Starz, DirectTV
// [SETTING] General>DRM Content>Play DRM-controlled content
// [TEST] https://bitmovin.com/demos/drm
// [1] https://www.eff.org/deeplinks/2017/10/drms-dead-canary-how-we-just-lost-web-what-we-learned-it-and-what-we-need-do-next
//user_pref("media.eme.enabled", false);
// Optionally, hide the setting which also disables the DRM prompt:
//user_pref("browser.eme.ui.enabled", false);

/******************************************************************************
 * SECTION: VARIOUS                            *
******************************************************************************/

// PREF: enable FTP protocol
// Firefox redirects any attempt to load a FTP resource to the default search engine if the FTP protocol is disabled.
// [1] https://www.ghacks.net/2018/02/20/firefox-60-with-new-preference-to-disable-ftp/
//user_pref("network.ftp.enabled", true);

// PREF: decode URLs in other languages
// [NOTE] I leave this off because it has unintended consequecnes when copy+paste links with underscores.
// [1] https://bugzilla.mozilla.org/show_bug.cgi?id=1320061
//user_pref("browser.urlbar.decodeURLsOnCopy", true);

// PREF: number of usages of the web console
// If this is less than 5, then pasting code into the web console is disabled
//user_pref("devtools.selfxss.count", 5);

/******************************************************************************
 * SECTION: GOOGLE SAFE BROWSING (GSB)                                        *
******************************************************************************/

// PREF: disable GSB (master switch)
// Increased privacy away from Google, but less protection against threats.
// [WARNING] Be sure to have alternate security measures if you disable Safe Browsing.
// [SETTING] Privacy & Security>Security>... Block dangerous and deceptive content
// [1] https://www.wikiwand.com/en/Google_Safe_Browsing#/Privacy
// [2] https://ashkansoltani.org/2012/02/25/cookies-from-nowhere
// [3] https://blog.cryptographyengineering.com/2019/10/13/dear-apple-safe-browsing-might-not-be-that-safe/
// [4] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1752006
// [5] https://github.com/privacyguides/privacyguides.org/discussions/423#discussioncomment-1767546
user_pref("browser.safebrowsing.malware.enabled", false);
user_pref("browser.safebrowsing.phishing.enabled", false);
      //user_pref("browser.safebrowsing.provider.google4.gethashURL", "");
      //user_pref("browser.safebrowsing.provider.google4.updateURL", "");
      //user_pref("browser.safebrowsing.provider.google.gethashURL", "");
      //user_pref("browser.safebrowsing.provider.google.updateURL", "");

// PREF: disable GSB checking downloads (master switch)
// This is the master switch for the safebrowsing.downloads prefs
// [SETTING] Privacy & Security>Security>... "Block dangerous downloads"
user_pref("browser.safebrowsing.downloads.enabled", false);
      
// PREF: disable GSB checks for downloads (remote)
// To verify the safety of certain executable files, Firefox may submit some information about the
// file, including the name, origin, size and a cryptographic hash of the contents, to the Google
// Safe Browsing service which helps Firefox determine whether or not the file should be blocked.
//user_pref("browser.safebrowsing.downloads.remote.enabled", false); // DEFAULT
      //user_pref("browser.safebrowsing.downloads.remote.url", "");
// [SETTING] Privacy & Security>Security>... "Warn you about unwanted and uncommon software"
user_pref("browser.safebrowsing.downloads.remote.block_potentially_unwanted", false);
user_pref("browser.safebrowsing.downloads.remote.block_uncommon", false);

// PREF: disable 'ignore this warning' on GSB warnings
// If clicked, it bypasses the block for that session. This is a means for admins to enforce SB.
// [1] https://bugzilla.mozilla.org/1226490
user_pref("browser.safebrowsing.blockedURIs.enabled", false);
//user_pref("browser.safebrowsing.allowOverride", true); // DEFAULT

// PREF: enforce GSB (local checks only) [OVERRIDE]
// [NOTE] All the checks made by GSB will be performed locally, 
// as if you enabled Safe Browsing in about:preferences#privacy
// If you want to re-enable GSB, insert the following prefs in your overrides:
user_pref("browser.safebrowsing.malware.enabled", true);
user_pref("browser.safebrowsing.phishing.enabled", true);
user_pref("browser.safebrowsing.blockedURIs.enabled", true);
user_pref("browser.safebrowsing.allowOverride", false);
// If you also want Safe Browsing to locally check your downloads, uncomment:
//user_pref("browser.safebrowsing.downloads.enabled", false);

/******************************************************************************
 * SECTION: MOZILLA                                                   *
******************************************************************************/

// PREF: disable Firefox accounts
// [ALTERNATIVE] Use xBrowserSync
// [1] https://addons.mozilla.org/en-US/firefox/addon/xbs
user_pref("identity.fxaccounts.enabled", false);

// PREF: enable Firefox accounts [OVERRIDE]
user_pref("identity.fxaccounts.enabled", true);

// PREF: disable Push API
// Push is an API that allows websites to send you (subscribed) messages even when the site
// isn't loaded, by pushing messages to your userAgentID through Mozilla's Push Server.
// [1] https://support.mozilla.org/en-US/kb/push-notifications-firefox
// [2] https://developer.mozilla.org/en-US/docs/Web/API/Push_API
// [3] https://www.reddit.com/r/firefox/comments/fbyzd4/the_most_private_browser_isnot_firefox/
user_pref("dom.push.enabled", false);
//user_pref("dom.push.userAgentID", "");

// PREF: Set a default permission for Notifications
// To add site exceptions: Page Info>Permissions>Receive Notifications.
// To manage site exceptions: Options>Privacy & Security>Permissions>Notifications>Settings.
// 0=always ask (default), 1=allow, 2=block
user_pref("permissions.default.desktop-notification", 2);

// PREF: enable site notification [OVERRIDE]
user_pref("dom.push.enabled", true);
user_pref("permissions.default.desktop-notification", 0);

// PREF: disable annoying location requests from websites
user_pref("permissions.default.geo", 2);
// PREF: Use Mozilla geolocation service instead of Google when geolocation is enabled
user_pref("geo.provider.network.url", "https://location.services.mozilla.com/v1/geolocate?key=%MOZILLA_API_KEY%");
// PREF: Enable logging geolocation to the console
//user_pref("geo.provider.network.logging.enabled", true);

// PREF: re-enable location requests from websites [OVERRIDE]
user_pref("permissions.default.geo", 0);

// PREF: disable using the OS's geolocation service
user_pref("geo.provider.ms-windows-location", false); // [WINDOWS]
user_pref("geo.provider.use_corelocation", false); // [MAC]
user_pref("geo.provider.use_gpsd", false); // [LINUX]
user_pref("geo.provider.use_geoclue", false); // [FF102+] [LINUX]

// PREF: disable region updates
// [1] https://firefox-source-docs.mozilla.org/toolkit/modules/toolkit_modules/Region.html
//user_pref("browser.region.network.url", "");
user_pref("browser.region.update.enabled", false);

// PREF: Enforce Firefox blocklist for extensions + No hiding tabs
// This includes updates for "revoked certificates".
// [1] https://blog.mozilla.org/security/2015/03/03/revoking-intermediate-certificates-introducing-onecrl/
// [2] https://trac.torproject.org/projects/tor/ticket/16931
//user_pref("extensions.blocklist.enabled", true); // DEFAULT

// PREF: disable auto-INSTALLING Firefox updates [NON-WINDOWS]
// [NOTE] In FF65+ on Windows this SETTING (below) is now stored in a file and the pref was removed
// [SETTING] General>Firefox Updates>Check for updates but let you choose to install them
//user_pref("app.update.auto", false);

// PREF: disable search engine updates (e.g. OpenSearch)
// [NOTE] This does not affect Mozilla's built-in or Web Extension search engines
//user_pref("browser.search.update", false);

// PREF: Disable automatic extension updates [move to Pesky]
//user_pref("extensions.update.enabled", false);

/******************************************************************************
 * SECTION: TELEMETRY                                                   *
******************************************************************************/
// Disable all the various Mozilla telemetry, studies, reports, etc.

// PREF: Telemetry
user_pref("toolkit.telemetry.unified", false);
user_pref("toolkit.telemetry.enabled", false);
user_pref("toolkit.telemetry.server", "data:,");
user_pref("toolkit.telemetry.archive.enabled", false);
user_pref("toolkit.telemetry.newProfilePing.enabled", false);
user_pref("toolkit.telemetry.shutdownPingSender.enabled", false);
user_pref("toolkit.telemetry.updatePing.enabled", false);
user_pref("toolkit.telemetry.bhrPing.enabled", false);
user_pref("toolkit.telemetry.firstShutdownPing.enabled", false);

// PREF: Corroborator
//user_pref("corroborator.enabled", false);

// PREF: Telemetry Coverage
user_pref("toolkit.telemetry.coverage.opt-out", true);
user_pref("toolkit.coverage.opt-out", true);
      //user_pref("toolkit.coverage.endpoint.base", "");

// PREF: Health Reports
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to send technical data.
user_pref("datareporting.healthreport.uploadEnabled", false);

// PREF: new data submission, master kill switch
// If disabled, no policy is shown or upload takes place, ever
// [1] https://bugzilla.mozilla.org/1195552
user_pref("datareporting.policy.dataSubmissionEnabled", false);

// PREF: Studies
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to install and run studies
user_pref("app.shield.optoutstudies.enabled", false);

// Personalized Extension Recommendations in about:addons and AMO
// [NOTE] This pref has no effect when Health Reports are disabled.
// [SETTING] Privacy & Security>Firefox Data Collection & Use>Allow Firefox to make personalized extension recommendations
user_pref("browser.discovery.enabled", false);

// PREF: disable crash reports
      // user_pref("breakpad.reportURL", "");
user_pref("browser.tabs.crashReporting.sendReport", false);
//user_pref("browser.crashReports.unsubmittedCheck.enabled", false); // DEFAULT
// PREF: backlogged crash reports
user_pref("browser.crashReports.unsubmittedCheck.autoSubmit2", false);

// PREF: Captive Portal detection
// [WARNING] Do NOT use for mobile devices. May NOT be able to use Firefox on public wifi (hotels, coffee shops, etc).
// [1] https://www.eff.org/deeplinks/2017/08/how-captive-portals-interfere-wireless-security-and-privacy
// [2] https://wiki.mozilla.org/Necko/CaptivePortal
user_pref("captivedetect.canonicalURL", "");
user_pref("network.captive-portal-service.enabled", false);

// PREF: Network Connectivity checks
// [WARNING] Do NOT use for mobile devices. May NOT be able to use Firefox on public wifi (hotels, coffee shops, etc).
// [1] https://bugzilla.mozilla.org/1460537
user_pref("network.connectivity-service.enabled", false);

// PREF: software that continually reports what default browser you are using
user_pref("default-browser-agent.enabled", false);

// PREF: "report extensions for abuse"
//user_pref("extensions.abuseReport.enabled", false);

// PREF: Normandy/Shield [extensions tracking]
// Shield is an telemetry system (including Heartbeat) that can also push and test "recipes"
user_pref("app.normandy.enabled", false);
user_pref("app.normandy.api_url", "");

// PREF: PingCentre telemetry (used in several System Add-ons)
// Currently blocked by 'datareporting.healthreport.uploadEnabled'
user_pref("browser.ping-centre.telemetry", false);

// PREF: disable Firefox Home (Activity Stream) telemetry 
user_pref("browser.newtabpage.activity-stream.telemetry", false);
user_pref("browser.newtabpage.activity-stream.feeds.telemetry", false);
