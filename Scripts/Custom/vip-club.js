$(document).ready(function () {
    $("#listAccordion").zAccordion({
        auto: false,
        slideWidth: 311,
        width: 674,
        height: 239,
        speed: 400
    });

    $("#privilege").click(function () {
        $("#privilege").addClass("active");
        $("#privilege_content").addClass("active");
        $("#service").removeClass("active");
        $("#service_content").removeClass("active");
        $("#other").removeClass("active");
        $("#other_content").removeClass("active");
        
    });

    $("#service").click(function () {
        $("#service").addClass("active");
        $("#service_content").addClass("active");
        $("#privilege").removeClass("active");
        $("#privilege_content").removeClass("active");
        $("#other").removeClass("active");
        $("#other_content").removeClass("active");
    });

    $("#other").click(function () {
        $("#other").addClass("active");
        $("#other_content").addClass("active");
        $("#privilege").removeClass("active");
        $("#privilege_content").removeClass("active");
        $("#service").removeClass("active");
        $("#service_content").removeClass("active");
    });
});