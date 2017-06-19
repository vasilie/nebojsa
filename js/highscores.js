var highscore;
function sendScores(){
    turnOffPopup();

    if ($("#name").val().trim().length > 1 && $("#name").val()!= '' ){
       
        $.ajax({
            url: "../php/highscore_send.php",
            type: "POST",
            data: {
                name : $("#name").val(),
                score : score
                // comment : comment
            }, 
            success: function(result){
                console.log(result);
                highscore = result;
                printNames(); 
                console.log("sending score: " + score);
                resetScores();
                console.log('everything is ok');
                gameStatus = 4;
                turnOffPopup();

            },
            error: function(result){
                console.log("Can't send score");
                console.log("Result: "+ result);
            }
        });
    }
}
function printNames(){
    var current_html = ""; 
    $.ajax({
        url: "../php/highscore_pull.php",
        success: function(result){
            highscore = result;  
            var parsed_score = JSON.parse(highscore);
            // console.log(parsed_score);
            for (i in parsed_score){

                var ime = parsed_score[i][1];
                var skor = parsed_score[i][2];
                // console.log(ime);
                // console.log(skor);
                current_html += "<li><span>" + ime + "</span> : <span>" + skor+"</span></li>";
                $(".imena").html(current_html);
                $(".imena li ").css({"color":player.color});
                $(".new-highscore input ").css({"border-color":player.color});
                // console.log(current_html);

            }
        },
        error:function(result){
            console.log("Can't print names");
            console.log("result: " + result);
        }
    });
	
}
var count = 0;
function showNewHighscore(){
    highscore_screen = true;
    count++;
    console.log("new highscore called "+count);
    var new_html = "Congratulations your score: "+ score;
    $("#current-score").html(new_html);
    $(".new-highscore").show();
    $("#name").focus();
    $(".mask").show();
}
function turnOffPopup(){
    $(".new-highscore").hide();
    highscore_screen = false;
    $(".mask").hide();
}
printNames();
