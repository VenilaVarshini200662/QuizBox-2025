document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackform");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.name.value;
        const email = form.email.value;
        const rating = form.rating.value;
        const description = form.description.value;

        const adminParams = {
            name: name,
            email: email,
            rating: rating,
            description: description
        };

        emailjs.send(
            "service_0amdbgy",
            "template_qoqyiso",
            adminParams
        )
        .then(() => {

            const autoReplyParams = {
                name: name,
                email: email
            };

            return emailjs.send(
                "service_0amdbgy",
                "template_9kxmdsk",
                autoReplyParams
            );
        })
        .then(() => {
            alert("Feedback sent successfully! Confirmation email sent.");
            form.reset();
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            alert("Failed to send feedback.");
        });
    });

});
