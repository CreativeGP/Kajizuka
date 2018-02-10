$(document).ready(() => {
    // Check user's cookie
    if ($.cookie("new") == false) {
        // If it is new user, show setting.
        setting();
    } else {
        dashboard();
    }
});
