
//获取分词结果


var analysisUtil={
    //返回的结果文本
    result:"",
    resultTxt:"",
    getRemoteAnalysis:function(text){
        var _this=this;
        var response={};
       $.ajax({
           type:"POST",
           url:"http://119.23.24.250:9876/api/SentiValue",
           dataType:"json",
           data: {content:text},
           async:false,
           success: function(res){
               response=res;
           }
        });


        _this.result=parseFloat(response.data);
        if(_this.result>0.5)
            _this.resultTxt="正面";
        else if (_this.result< -0.5)
            _this.resultTxt="负面";
        else
            _this.resultTxt="中性";


        return response;
    },
    initResult:function(){

        var _this=this;
        $("#reslut-page").html(this.resultTxt);

    },
    flush:function(){
        var remoteAnalysis=this.getRemoteAnalysis($("#txt-analysis").val());
        this.initResult();
    }



}



jQuery(function($) {

    $("#analysis-btn").click(function () {
        analysisUtil.flush();
    });

    analysisUtil.flush();

})