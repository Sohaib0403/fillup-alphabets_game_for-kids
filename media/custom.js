/*-- Document Ready Starts --*/
$(document).ready(function () {

    var sumbitCtr = 0;
    var newQuesArr = [];
    var cursorTimer;
    var insTop, insleft;
    let arrayData = null;
    textValue()
    
    $('#home2').on('click', function() {
        // Reload the entire document (like pressing F5)
        location.reload();
    
        console.log("Page reloaded");
    });

    function textValue() {
        $('.langBtn').on('click', function () {
            // Hide the .play container
            $('.play').hide();
            $('#lowerCase').hide();
            
            
            // Check the button's ID and execute corresponding logic
            if (this.id === 'engC') {
                arrayData = alphabets_data;
            } else if (this.id === 'engL') {
                arrayData = alphabets_data1;
            } else if (this.id === 'hin') {
                arrayData = alphabets_data3;
            } else if (this.id === 'chinese') {
                arrayData = alphabets_data5;
            } else if (this.id === 'french') {
                arrayData = alphabets_data6;
            } else {
                console.error('Unknown button ID');
            }
            playGame();
            homeGame();
            addElements();
            activeSubmit();
        });
    }


    function addElements() {

        $("#questiontxt").text(arrayData['alphabets'][0]['questionTxt']);

        shuffleArray(arrayData['alphabets'][0]['missing']);

        getRandomInt(Number(arrayData['alphabets'][0]['missing'][0]));

        for (var i = 1; i <= arrayData['alphabets'][0]['qestion_set'].length; i++) {

            $("<div/>", {
                'id': 'alphabet' + i,
                'class': 'alphabetStyle'
            }).appendTo('#alphabet_container');

            $("<div/>", {
                'id': 'alphabetTxt' + i,
                'class': 'alphabetTxt'
            }).appendTo('#alphabet' + i);

            $("<div/>", {
                'id': 'alphabetVal' + i,
                'class': 'alphabetVal',
                "num": 0,
                "value": arrayData['alphabets'][0]['qestion_set'][i - 1],
                'html': arrayData['alphabets'][0]['qestion_set'][i - 1],
            }).appendTo('#alphabetTxt' + i);



            $("<div/>", {
                'id': 'keyboard' + i,
                'class': 'keyboardStyle'
            }).appendTo('#keyboard_container');

            $("<div/>", {
                'id': 'keyboardTxt' + i,
                'class': 'keyboardTxt'
            }).appendTo('#keyboard' + i);

            $("<div/>", {
                'id': 'keyboardVal' + i,
                'class': 'keyboardVal',
                'html': arrayData['alphabets'][0]['keyboard_set'][i - 1],
            }).appendTo('#keyboardTxt' + i);

            $("#keyboard" + i).bind("mousedown", function () {
                $(this).css("opacity", "0.5");
                fillMissingChart($(this).text());
            });
            $("#keyboard" + i).bind("mouseup", function () {
                $(this).css("opacity", "1");
            });

            $("#keyboard_container").bind("mouseout", function () {
                $(".keyboardStyle").each(function (index) {
                    $(this).css("opacity", "1");
                });
            });


        }


        for (var i = 1; i <= newQuesArr.length; i++) {

            $("#alphabetVal" + newQuesArr[i - 1]).html("");
            //$("#alphabet" + newQuesArr[i - 1]).addClass("whitebackground");
            $("#alphabet" + newQuesArr[i - 1]).css("cursor", "pointer");

            $("#alphabet" + newQuesArr[i - 1]).bind("click", function () {
                selectMissingLetter($(this));
            });

        }

        var minVal = Math.min.apply(null, newQuesArr)
        insTop = $("#alphabet" + minVal).css('top');
        insleft = $("#alphabet" + minVal).css('left');

        try {
            $(".alphabetStyle").removeClass('animated zoomIn');
            $(".alphabetStyle").addClass('animated zoomIn');
            var setTimer = setTimeout(function () {
                $(".alphabetStyle").removeClass('animated zoomIn');
                clearTimeout(setTimer);
            }, 600);

        } catch (error) {

        }


    }



    function getRandomInt(max) {

        while (newQuesArr.length < max) {
            var randomnumber = Math.floor(Math.random() * 26 + 1);
            if (newQuesArr.indexOf(randomnumber) > -1)
                continue;
            newQuesArr[newQuesArr.length] = randomnumber;
        }

    }

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }


    function selectMissingLetter(obj) {

        clearTimeout(cursorTimer);
        $(".ins_arrow").hide();

        for (var i = 1; i <= arrayData['alphabets'][0]['qestion_set'].length; i++) {
          //  $("#alphabet" + i).css("border", "3px solid lightsteelblue");
            $("#alphabet" + i).removeClass("animated zoomIn");
            $("#alphabet" + i).removeClass("animated flipInX");
            $("#alphabet" + i).removeClass("animated bounceIn");

        }
        obj.css("border", "4px solid green");
        obj.addClass("animated flipInX");
        $(".alphabetVal").each(function (index) {
            $(this).attr("num", 0);
        });
        obj.find(".alphabetVal").attr("num", 1);

    }

    function fillMissingChart(text) {

        fillChartCtr = 0;
        for (var i = 1; i <= arrayData['alphabets'][0]['qestion_set'].length; i++) {
            if ($("#alphabetVal" + i).attr("num") == 1) {
                $("#alphabetVal" + i).text(text);
                $("#alphabet" + i).removeClass("whitebackground");
                $(".alphabetStyle").each(function (index) {
                //    $(this).css("border", "3px solid lightsteelblue");
                });

               
                if($("#alphabetVal" + i).attr("value") == text){
                    $("#alphabet" + i).removeClass('animated flipInX');
                    $("#alphabet" + i).addClass('animated bounceIn');
                    var objCurr = $("#alphabet" + i);
                    var setTimerObj = setTimeout(function () {
                        objCurr.removeClass('animated bounceIn');
                        clearTimeout(setTimerObj);
                    }, 600);
                }

                $(".alphabetVal").each(function (index) {
                    $(this).attr("num", 0);
                    if ($(this).text().length == 0) {
                    } else {
                        fillChartCtr++;
                        // if (fillChartCtr == 26) {
                        //     activeSubmit();
                        //     var resultchk = checkResult();
                        //     if (resultchk) {
                        //         playweldoneAudio();
                        //     }
                        // }
                    }
                });
            } else {

            }
        }
    }


    function checkResult() {

        var localArrRes = [];

        $(".alphabetVal").each(function (index) {
            var num = $(this).text();
            localArrRes[index] = num;
        });


        var a = localArrRes;
        var b = arrayData['alphabets'][0]['qestion_set'];

        for(var i = 0; i< a.length; i++){

            if(a[i] == b[i]){
                
            }else{

                $("#alphabet"+(i+1)).css("border", "4px solid red");
                
            }

        }

        // comparing both arrays using stringify 
        if (JSON.stringify(a) == JSON.stringify(b)) {
            // console.log("True");
            return true;
        } else {
            //console.log("False");
            return false;
        }
    }

    function submitResult() {
        sumbitCtr++;
        var result = checkResult();
        if (result) {
            sumbitCtr = 0;
            correctFeedback();
        } else {
            wrongFeedback();
        }
    }

    function wrongFeedback() {

        if (sumbitCtr == 20) {
            sumbitCtr = 0;
            deactiveSubmit();
            $("#submit_btn").hide();
            showAnswer();
            playshowanswerAudio();

        } else {
            deactiveSubmit();
            $("#submit_btn").hide();
            showTryAgain();
            playwrongAudio();

            $("#tryagainbg").show();
            $(".tryfeedback").removeClass('animated zoomIn');
            $(".tryfeedback").addClass('animated zoomIn');
            var setTimer = setTimeout(function () {
                $(".tryfeedback").removeClass('animated zoomIn');
                $("#tryagainbg").hide();
                clearTimeout(setTimer);
            }, 2000);

        }

    }
    
    function correctFeedback() {
        deactiveSubmit();
        $("#submit_btn").hide();
        activeWelldoneBtn();
        playcongAudio();

        $("#welldonebg").show();
        $("#stopclick").show();
        $(".welldone").removeClass('animated zoomIn');
        $(".welldone").addClass('animated zoomIn');
        var setTimer = setTimeout(function () {
            $(".welldone").removeClass('animated zoomIn');
            $("#welldonebg").hide();
            clearTimeout(setTimer);
        }, 2000);

    }

    function showTryAgain() {
        $("#stopclick").show();
        $("#tryagn_btn").show();
        $("#tryagn_btn").unbind("click", tryAgain);
        $("#tryagn_btn").bind("click", tryAgain);
    }

    function showAnswer() {
        $("#stopclick").show();
        $("#showanswer_btn").show();
        $("#showanswer_btn").unbind("click", showResult);
        $("#showanswer_btn").bind("click", showResult);
    }

    function showResult() {
        hideShowAnswer();
        for (var i = 1; i <= arrayData['alphabets'][0]['qestion_set'].length; i++) {
            $("#alphabetVal" + i).text(arrayData['alphabets'][0]['qestion_set'][i - 1]);
        }

    }
    function hideShowAnswer() {
        $("#showanswer_btn").unbind("click", showResult);
        $("#showanswer_btn").hide();
    }
    function hideTryAgain() {

        $("#tryagn_btn").unbind("click", tryAgain);
        $("#tryagn_btn").hide();

    }
    
    function tryAgain() {
        $("#stopclick").hide();
        hideTryAgain();
        activeSubmit();

        for (var i = 1; i <= arrayData['alphabets'][0]['qestion_set'].length; i++) {
            $("#alphabet"+i).css("border", "none");
            $("#alphabet"+i).css("border", "3px solid lightsteelblue");
        }
        
        
    }

    function playAgain() {

        $("#stopclick").hide();
        hideTryAgain();
        hideShowAnswer();
        deactiveWelldoneBtn();
        activeSubmit();
        newQuesArr = [];


        try {
            $(".ins_arrow").hide();
            clearTimeout(cursorTimer);
            cursorTimer = setTimeout(function () {
                $(".ins_arrow").show();

                insTop = parseFloat(insTop) + 30;
                insleft = parseFloat(insleft) + 30;
                $(".ins_arrow").css({
                    "top": insTop,
                    "left": insleft
                })
                clearTimeout(cursorTimer);

                try {
                    clearTimeout(newcursorTimer);
                    var newcursorTimer = setTimeout(function () {
                        $(".ins_arrow").hide();
                        clearTimeout(newcursorTimer);
                    }, 4000);
                } catch (error) {

                }

            }, 3000);
        } catch (error) {

        }

        $(".alphabetStyle").removeClass('animated zoomIn');
        $("#alphabet_container").empty();
        $("#keyboard_container").empty();
        addElements();
    }

    function activeSubmit() {
        $("#submit_btn").show();
        $("#submit_btn").unbind("click", submitResult);
        $("#submit_btn").bind("click", submitResult);

    }

    function deactiveSubmit() {

        $("#submit_btn").hide();
        $("#submit_btn").unbind("click", submitResult);

    }

    function activeWelldoneBtn() {

        $("#weldone_btn").show();
        $("#weldone_btn").unbind("click", playAgain);
        $("#weldone_btn").bind("click", playAgain);

    }

    function deactiveWelldoneBtn() {

        $("#weldone_btn").hide();
        $("#weldone_btn").unbind("click", playAgain);

    }

    function playGame() {
        $("#play_btn").bind("click", playAgain);
    }
    function homeGame() {
        $("#replay").bind("click", playAgain);
    }

    function playweldoneAudio() {
        var objPlayMusic = document.createElement("audio");
        objPlayMusic.src = "media/audio/welldone.mp3";
        objPlayMusic.play();
    }

    function playcongAudio() {
        var objPlayMusic = document.createElement("audio");
        objPlayMusic.src = "media/audio/welldone.mp3";
        objPlayMusic.play();
    }

    function playshowanswerAudio() {
        // var objPlayMusic = document.createElement("audio");
        // objPlayMusic.src = "media/audio/demi.mp3";
        // objPlayMusic.play();
    }

    function playwrongAudio() {
        var objPlayMusic = document.createElement("audio");
        objPlayMusic.src = "media/audio/tryagain.mp3";
        objPlayMusic.play();
    }

    $("#play_audio").bind("click", playbgm);
    $("#pause_audio").bind("click", pausebgm);
    var objPlayPauseMusic = document.createElement("audio");
    objPlayPauseMusic.src = "media/audio/bgm.mp3";
    objPlayPauseMusic.addEventListener('ended', playbgm)

    function playbgm() {
        objPlayPauseMusic.play();
    }
    function pausebgm() {
        objPlayPauseMusic.pause();
    }

});
