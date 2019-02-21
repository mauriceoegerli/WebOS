function toggleHistory(){
    if(systemManager.appManager.historyOpened === true){
        closeHistory();
    }
    else{
        openHistory();
    }
}
function openHistory(){
    $("#app-history-container").addClass("open");
    $('#app-history').empty();
    systemManager.appManager.openApps.forEach((element, index) => {
        let historyEntry = $(element).clone();

        let id = element.attr('id')
        let appTitle = id.slice(0, 1).toUpperCase() + id.replace('-app', '').slice(1);

        let appHistoryEntry = `
        <div class="app-history-entry-container">
            <div id="app-history-entry-${index}" class="app-history-entry">
                <div class="app-history-title">
                    <p class="app-history-title-label">${appTitle}</p>
                </div>
                <div class="history-cover"></div>
            </div>
        </div>`;

        historyEntry.addClass('history');   
        $('#app-history').append(appHistoryEntry);
        $('#app-history-entry-' + index).append(historyEntry);
    });

    let scrollHeight = $("#app-history-container").height();
    $("#app-history-container").scrollTop(scrollHeight);

    systemManager.appManager.historyOpened = true;
    if(systemManager.appManager.currentApp !== 'none'){
        $(systemManager.appManager.currentApp).addClass('history-open');
    }
}

function closeHistory(){
    $("#app-history-container").addClass("close");

    setTimeout(function(){
        $("#app-history-container").removeClass("open");
        $("#app-history-container").removeClass("close");

        $(".app-history-entry").empty();

        systemManager.appManager.historyOpened = false;
    }, 300);
}

//# sourceURL=app-history.js