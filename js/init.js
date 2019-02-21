async function preLoader() {
    await loadClass('loader');
    let loadAnimation = new LoadAnimation;

    for (let index = 0; index < classes.length; index++) {
        const element = classes[index];
        await loadClass(element);
        loadAnimation.updateText(`Loading ${element}.js`);
        loadAnimation.updateLoadingBar(5);
    }
    loadAnimation.updateText('Finished loading JavaScript');

    systemManager.wallpaperManager = new WallpaperManager();
    loadAnimation.updateText('Caching images...');
    let currentWallpaperName = await systemManager.wallpaperManager.preloadImages();
    currentWallpaperPath = `img/backgrounds/${currentWallpaperName}`;
    systemManager.wallpaperManager.updateWallpaper(currentWallpaperPath, currentWallpaperName);

    loadAnimation.updateText('Images cached');
    loadAnimation.updateLoadingBar(20);

    systemManager.clock = new Clock();
    loadAnimation.updateText('Initializing clock');
    systemManager.clock.initClock();
    systemManager.clock.runClock();
    loadAnimation.updateText('Clock initialized');
    loadAnimation.updateLoadingBar(1);

    loadAnimation.updateText('loading apps');
    systemManager.appManager = new appManager();
    await systemManager.appManager.initApps();
    systemManager.appManager.loadAppLinks();
    loadAnimation.updateLoadingBar(20);
    loadAnimation.updateText('apps loaded');

    loadAnimation.updateText('loading lockscreen');
    systemManager.lockScreen = new Lockscreen();
    await systemManager.lockScreen.loadLockScreen();
    loadAnimation.updateLoadingBar(20);
    loadAnimation.updateText('lockscreen loaded');

    loadAnimation.finishLoading();
}

var classes = [
    'touch',
    'main',
    'app-history',
    'app',
    'clock',
    'wallpaper',
    'lockscreen'
]

function loadClass(className) {
    return new Promise(
        function(resolve, reject){
            var source = `js/classes/${className}.js`;
            $.ajax({
                crossDomain: true,
                dataType: "script",
                url: source
            })
            .done(function(script, textStatus){
                resolve(script);
            })
            .fail(function( jqxhr, settings, exception ){
                reject(exception);
            });
        }
    );
}

//# sourceURL=init.js