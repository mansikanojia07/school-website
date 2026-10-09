/* =====================================================
   PHOENIX INTERNATIONAL & THE LILLIPUTS
   FINAL JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU - FINAL FIX
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (!menuBtn || !mobileMenu) return;


    /* OPEN / CLOSE HAMBURGER */

    menuBtn.addEventListener("click", function (event) {

        event.preventDefault();
        event.stopPropagation();

        mobileMenu.classList.toggle("active");
        mobileMenu.classList.toggle("open");
        menuBtn.classList.toggle("active");

    });


    /* MOBILE MENU LINKS */

    const mobileLinks = mobileMenu.querySelectorAll("a");

    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            /* Close menu */

            mobileMenu.classList.remove("active");
            mobileMenu.classList.remove("open");
            menuBtn.classList.remove("active");

            /* IMPORTANT:
               Do NOT use preventDefault().
               Browser will open href normally.
            */

        });

    });


    /* CLICK OUTSIDE */

    document.addEventListener("click", function (event) {

        if (
            !mobileMenu.contains(event.target) &&
            !menuBtn.contains(event.target)
        ) {

            mobileMenu.classList.remove("active");
            mobileMenu.classList.remove("open");
            menuBtn.classList.remove("active");

        }

    });

});


/* =====================================================
   HEADER SCROLL
===================================================== */

const header =
    document.getElementById("siteHeader");

if (header) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}



/* =====================================================
   HERO MOUSE EFFECT
===================================================== */

const hero =
    document.querySelector(".hero");

const heroCircle =
    document.querySelector(".hero-circle");


if (hero && heroCircle) {

    hero.addEventListener("mousemove", function (event) {

        const x =
            (window.innerWidth / 2 - event.clientX) / 35;

        const y =
            (window.innerHeight / 2 - event.clientY) / 35;

        heroCircle.style.transform =
            `translate(${x}px, ${y}px)`;

    });


    hero.addEventListener("mouseleave", function () {

        heroCircle.style.transform =
            "translate(0, 0)";

    });

}



/* =====================================================
   DYNAMIC GALLERY
===================================================== */

const galleryFilters =
    document.querySelectorAll(".gallery-filter");

const galleryItems =
    document.querySelectorAll(".gallery-item");


if (
    galleryFilters.length > 0 &&
    galleryItems.length > 0
) {

    galleryFilters.forEach(function (filter) {

        filter.addEventListener("click", function () {

            /* Remove active class */

            galleryFilters.forEach(function (button) {

                button.classList.remove("active");

            });


            /* Add active class */

            filter.classList.add("active");


            /* Get selected category */

            const selectedCategory =
                filter.getAttribute("data-filter");


            /* Filter gallery */

            galleryItems.forEach(function (item) {

                const itemCategory =
                    item.getAttribute("data-category");


                if (
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });

}



/* =====================================================
   GALLERY LIGHTBOX
===================================================== */

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxNext =
    document.getElementById("lightboxNext");

const lightboxPrev =
    document.getElementById("lightboxPrev");


let currentGalleryIndex = 0;



/* =====================================================
   GET VISIBLE GALLERY ITEMS
===================================================== */

function getVisibleGalleryItems() {

    return Array.from(galleryItems).filter(function (item) {

        return !item.classList.contains("hidden");

    });

}



/* =====================================================
   SHOW GALLERY IMAGE
===================================================== */

function showGalleryImage() {

    const visibleItems =
        getVisibleGalleryItems();


    if (
        visibleItems.length === 0 ||
        !lightboxImage
    ) {

        return;

    }


    const currentItem =
        visibleItems[currentGalleryIndex];


    if (!currentItem) return;


    const image =
        currentItem.querySelector("img");


    if (!image) return;


    lightboxImage.src = image.src;

    lightboxImage.alt = image.alt || "";

}



/* =====================================================
   OPEN GALLERY IMAGE
===================================================== */

if (
    galleryItems.length > 0 &&
    galleryLightbox
) {

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const visibleItems =
                getVisibleGalleryItems();


            currentGalleryIndex =
                visibleItems.indexOf(item);


            if (currentGalleryIndex < 0) {

                currentGalleryIndex = 0;

            }


            showGalleryImage();


            galleryLightbox.classList.add("open");

        });

    });

}



/* =====================================================
   NEXT IMAGE
===================================================== */

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const visibleItems =
                getVisibleGalleryItems();


            if (visibleItems.length === 0) return;


            currentGalleryIndex++;


            if (
                currentGalleryIndex >=
                visibleItems.length
            ) {

                currentGalleryIndex = 0;

            }


            showGalleryImage();

        }
    );

}



/* =====================================================
   PREVIOUS IMAGE
===================================================== */

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();


            const visibleItems =
                getVisibleGalleryItems();


            if (visibleItems.length === 0) return;


            currentGalleryIndex--;


            if (currentGalleryIndex < 0) {

                currentGalleryIndex =
                    visibleItems.length - 1;

            }


            showGalleryImage();

        }
    );

}



/* =====================================================
   CLOSE LIGHTBOX
===================================================== */

if (lightboxClose && galleryLightbox) {

    lightboxClose.addEventListener(
        "click",
        function () {

            galleryLightbox.classList.remove("open");

        }
    );

}



/* =====================================================
   CLOSE LIGHTBOX ON BACKGROUND CLICK
===================================================== */

if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        function (event) {

            if (
                event.target === galleryLightbox
            ) {

                galleryLightbox.classList.remove("open");

            }

        }
    );

}



/* =====================================================
   LIGHTBOX KEYBOARD CONTROLS
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains("open")
        ) {

            return;

        }


        /* Escape */

        if (event.key === "Escape") {

            galleryLightbox.classList.remove("open");

        }


        /* Next */

        if (
            event.key === "ArrowRight" &&
            lightboxNext
        ) {

            lightboxNext.click();

        }


        /* Previous */

        if (
            event.key === "ArrowLeft" &&
            lightboxPrev
        ) {

            lightboxPrev.click();

        }

    }
);



/* =====================================================
   DYNAMIC NOTICE BOARD
===================================================== */

const noticeFilters =
    document.querySelectorAll(".notice-filter");

const noticeCards =
    document.querySelectorAll(".notice-card");


if (noticeFilters.length > 0) {

    noticeFilters.forEach(function (filter) {

        filter.addEventListener(
            "click",
            function () {

                /* Remove active */

                noticeFilters.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                /* Add active */

                filter.classList.add("active");


                /* Get selected category */

                const selectedCategory =
                    filter.getAttribute(
                        "data-notice-filter"
                    );


                /* Filter notices */

                noticeCards.forEach(
                    function (card) {

                        const cardCategory =
                            card.getAttribute(
                                "data-notice-category"
                            );


                        if (
                            selectedCategory === "all" ||
                            selectedCategory ===
                            cardCategory
                        ) {

                            card.classList.remove(
                                "hidden"
                            );

                        } else {

                            card.classList.add(
                                "hidden"
                            );

                        }

                    }
                );

            }
        );

    });

}



/* =====================================================
   ADMISSION POPUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const admissionPopup =
            document.getElementById(
                "admissionPopup"
            );

        const posterClose =
            document.getElementById(
                "posterClose"
            );


        if (
            posterClose &&
            admissionPopup
        ) {

            posterClose.addEventListener(
                "click",
                function () {

                    admissionPopup.classList.add(
                        "hide"
                    );

                }
            );

        }

    }
);

/* =====================================================
   STAFF VIEW MORE POPUP
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("staffPopup");
    const closeButton = document.getElementById("staffPopupClose");
    const overlay = document.getElementById("staffPopupOverlay");

    const popupImage = document.getElementById("popupStaffImage");
    const popupName = document.getElementById("popupStaffName");
    const popupRole = document.getElementById("popupStaffRole");
    const popupDescription =
        document.getElementById("popupStaffDescription");

    const buttons =
        document.querySelectorAll(".view-more-btn");


    /* OPEN POPUP */

    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-name");

            const role =
                button.getAttribute("data-role");

            const image =
                button.getAttribute("data-image");

            const description =
                button.getAttribute("data-description");


            popupName.textContent = name;
            popupRole.textContent = role;
            popupDescription.textContent = description;

            popupImage.src = image;
            popupImage.alt = name;


            popup.classList.add("active");

            document.body.style.overflow = "hidden";

        });

    });


    /* CLOSE POPUP */

    function closePopup() {

        popup.classList.remove("active");

        document.body.style.overflow = "";

    }


    closeButton.addEventListener(
        "click",
        closePopup
    );


    overlay.addEventListener(
        "click",
        closePopup
    );


    /* ESC KEY */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                popup.classList.contains("active")
            ) {

                closePopup();

            }

        }
    );

});