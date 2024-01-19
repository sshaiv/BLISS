
document.addEventListener("DOMContentLoaded", function () {
    const inputFiles = document.querySelectorAll(".input-file");
    const imageViews = document.querySelectorAll(".img-view");

    inputFiles.forEach((inputFile, index) => {
        inputFile.addEventListener("change", (event) => {
            console.log("File selected");
            uploadImage(event, index);
        });
    });

    function uploadImage(event, index) {
        const imgLink = URL.createObjectURL(event.target.files[0]);
        console.log("imgLink:", imgLink);

        imageViews[index].style.backgroundImage = `url(${imgLink})`;
        imageViews[index].textContent = "";
        imageViews[index].style.border = "0";
    }
});
