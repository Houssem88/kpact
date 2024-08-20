window.onload = function () {
    emailjs.send("service_o7fcw48", "template_nw5hs8a", {
        message: "A user used Kapct"
    })
        .then(function (response) {
            console.log("SUCCESS!", response.status, response.text);
        }, function (error) {
            console.log("FAILED...", error);
        });
};