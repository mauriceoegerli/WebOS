function WallpaperManager() {
    this.wallpapers= [];
    this.currentWallpaperName = '';
    this.currentWallpaperPath = '';

    this.updateWallpaper = function (path, name) {
        this.currentWallpaperPath = `${path}`;
        this.currentWallpaperName = name;
        $("#home-screen").css("background-image", `url("${path}")`);
    };

    this.preloadImages = function(){
        return new Promise(
            function(resolve, reject){
                $.ajax({
                    url: 'img/backgrounds/info.json'
                })
                .done(async function (data) {
                    currentWallpaperName = data[0].path;
                    wallpapers = data;

                    for (let index = 0; index < wallpapers.length; index++) {
                        const element = wallpapers[index];
                        await new Promise(function (resolve, reject) {
                            var image = new Image;
                            image.src = `img/backgrounds/${element.path}`;
                            image.addEventListener('load', function () {
                                resolve(image);
                            });
                        });
                        await new Promise(function(resolve, reject){
                            var image = new Image;
                            image.src = `img/backgrounds/thmb/${element.thmb}`;
                            image.addEventListener('load', function () {
                                resolve(image);
                            });
                        });
                    }

                    resolve(currentWallpaperName);
                });
            }
        );
    }
}
