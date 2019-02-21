wallpapers.forEach(element => {
    $(".wallpaper-selector-images").append(function(){
        let image = $("<div></div>");
        image.addClass("wallpaper-selector-image");
        image.css("background-image", `url("img/backgrounds/thmb/${element.thmb}")`);
        image.attr("imgPath", element.path);
        return image;
    });
});

updateSettingsWallpaper();

$("#main-view").addClass("visible");

$(".wallpaper-selector-image").on("click", setSettingsWallpaper);
$("#wallpaper-uploader").change(function(){
    newWallpaper(this);
});

$("#wallpaper").on("click", function(){
    openNewView("wallpaper");
});

$("#about").on("click", function(){
    openNewView("about");
});

function newWallpaper(input){
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (element) {
            $(".wallpaper-selector-images").append(function(){
                let image = $("<div></div>");
                image.addClass("wallpaper-selector-image");
                image.css("background-image", `url("${element.target.result}")`);
                image.attr("imgPath", element.target.result);
                image.attr("id", "wallpaper-" + $(".wallpaper-selector-images div").length);
                image.on("click", function(){
                    setNewWallpaper(this);
                });
                return image;
            });

            var currentWallpaper = $("#wallpaper-" + ($(".wallpaper-selector-images div").length - 1));
            currentWallpaper.trigger( "click" );
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function updateSettingsWallpaper(){
    $('.wallpaper-selector-image').each(function() {
        if($(this).attr("imgPath") === systemManager.wallpaperManager.currentWallpaperName){
            $(this).addClass("selected");
        }
        else{
            $(this).removeClass("selected");
        }
    });

    $(".wallpaper-container").addClass("wallpaper-transition");

    setTimeout(function(){
        $(".wallpaper-container").removeClass("wallpaper-transition");
    }, 1000);
    
    setTimeout(function(){
        $(".wallpaper-container").css("background-image", `url("${systemManager.wallpaperManager.currentWallpaperPath}")`);
    }, 500);
}

function openNewView(viewName){
    var view = $("#" + viewName + "-view");
    systemManager.appManager.openView(view);
}

function setSettingsWallpaper(){
    systemManager.wallpaperManager.currentWallpaperPath = `img/backgrounds/${$(this).attr("imgPath")}`;
    systemManager.wallpaperManager.currentWallpaperName = `${$(this).attr("imgPath")}`;
    updateSettingsWallpaper();
    systemManager.wallpaperManager.updateWallpaper(systemManager.wallpaperManager.currentWallpaperPath, systemManager.wallpaperManager.currentWallpaperName);
}

function setNewWallpaper(element){
    systemManager.wallpaperManager.currentWallpaperPath = `${$(element).attr("imgPath")}`;
    systemManager.wallpaperManager.currentWallpaperName = `${$(element).attr("imgPath")}`;
    updateSettingsWallpaper();
    systemManager.wallpaperManager.updateWallpaper(systemManager.wallpaperManager.currentWallpaperPath, systemManager.wallpaperManager.currentWallpaperName);
}

//# sourceURL=settings.js