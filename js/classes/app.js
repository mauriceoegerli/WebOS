function appManager() {
    this.currentApp = 'none';
    this.currentAppName = 'none';
    this.savedViews = [];
    this.openApps = [];
    this.historyOpened = false;
    this.parent = this;

    this.initApps = function () {
        let me = this;
        $("#nav-home-container").on('click', me.closeApp);
        $("#nav-back-container").on("click", me.closeView);
        $("#nav-history-container").on('click', toggleHistory);
    }

    this.loadAppLinks = function () {
        var me = this;
        return new Promise(
            function (resolve, reject) {
                let appsApi = '../api/getAppNames.php';
                $.ajax({
                    url: appsApi,
                    success: function (data) {
                        let appLinks = JSON.parse(data);
                        let appLinkArray = Object.keys(appLinks).map(function (key) {
                            return appLinks[key];
                        });
                        console.log(appLinkArray);
                        for (let index = 0; index < appLinkArray.length; index++) {
                            const element = appLinkArray[index];
                            $(`#${element}-icon`).on('click', function () {
                                me.openApp(element, $(`#${element}-icon>.app-icon`).offset(), element);
                            });
                        }
                    }
                });
            }
        );
    }

    this.openApp = function (name, position, fileName) {
        var me = this;
        var currentElement = $("#" + name + "-app");
        var loadedIndex = this.openApps.find(function (element) {
            return element.attr('id') == currentElement.attr('id');
        });

        if (loadedIndex === undefined) {
            $.ajax({
                url: `apps/${name}/${fileName}.html`,
            })
                .done(function (data) {
                    $("#app-container").append(data);
                    me.currentAppName = name;
                    var currentElement = $("#" + name + "-app");
                    showOpeningApp(currentElement);

                    me.openApps.push(currentElement);
                });
        }
        else {
            var currentElement = $("#" + name + "-app");
            showOpeningApp(currentElement);
            me.currentAppName = name;
        }

        function showOpeningApp(element) {
            $("#" + name + "-icon").addClass("opening");
            element.css('position', 'absolute');
            element.css('top', `calc(${position.top}px - 50%)`);
            element.css('left', `calc(${position.left}px - 50%`);

            $(".app-grid-container").addClass("appOpen");

            element.addClass("opened");

            me.currentApp = element;
        }
    }

    this.closeApp = function () {
        const me = systemManager.appManager;
        if (me.historyOpened === true) {
            closeHistory();
        }
        else {
            if (me.currentApp === 'none') {
            }
            else {
                me.currentApp.addClass("closing");
                $("#" + me.currentAppName + "-icon").addClass("closing");
                $(".app-grid-container").removeClass("appOpen");

                setTimeout(function () {
                    $("#" + me.currentAppName + "-icon").removeClass("opening");
                    $("#" + me.currentAppName + "-icon").removeClass("closing");
                    me.currentApp.removeClass("opened");
                    me.currentApp.removeClass("closing");
                    me.currentApp = 'none';
                }, 400);
            }
        }

    }

    this.addWebWindowHistory = function (name) {
        var appIndex = getIndexOfCurrentApp();
        if (this.savedViews.includes(name)) {
            this.savedViews[appIndex].webWindowHistory++;
        }
        else {
            this.savedViews.push({ "appName": name, views: [], webWindowHistory: 1 });
        }
    }

    this.openView = function (view) {
        if (this.savedViews.includes(this.currentAppName)) {
        }
        else {
            this.savedViews.push({ "appName": this.currentAppName, "views": [], "webWindowHistory": 0 });
        }
        var appIndex = this.getIndexOfCurrentApp();
        this.savedViews[appIndex].views.push(view);

        view.addClass("opened");
    }

    this.getIndexOfCurrentApp = function () {
        var me = this;
        return this.savedViews.findIndex(function (element) {
            return element.appName === me.currentAppName;
        });
    }

    this.closeView = function () {
        const me = systemManager.appManager;
        if (me.historyOpened === true) {
            closeHistory();
        }
        else {
            debugger;
            if (me.currentApp !== 'none') {
                let currentAppIndex = me.getIndexOfCurrentApp();
                if (currentAppIndex != undefined) {
                    let appIndex = currentAppIndex;
                    if (me.savedViews[appIndex].webWindowHistory > 1) {
                        window.history.back();
                    }
                    else if (appIndex !== -1) {

                        if (me.savedViews[appIndex].views.length < 1) {
                            me.closeApp();
                        }
                        else {
                            var views = me.savedViews[appIndex].views;
                            var openView = views[views.length - 1];

                            openView.addClass("closing");

                            setTimeout(function () {
                                openView.removeClass("opened");
                                openView.removeClass("closing");
                                me.savedViews[appIndex].views.length = me.savedViews[appIndex].views.length - 1;
                            }, 300);
                        }
                    }
                    else {
                        me.closeApp();
                    }
                }
                else {
                    me.closeApp();
                }
            }
        }

    }

}


//# sourceURL=app.js