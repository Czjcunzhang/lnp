
//获取分词结果


var analysisUtil={
    tagDesc:{},
    tags:[],
    getRemoteAnalysis:function(text){
        var _this=this;
        var response={
            words:["郭志鹏","生日","是","1996-02-15"],
            tags:{
                "PERSON":["郭志鹏"],
                "TIME":["1996-02-15"],
                "LOCATION":["深圳市南山区"],
                "ORGANIZATION":["春意公司"],
                "CURRENCY":["100万元"],
                "others":["，","。"]
            },
            tagDesc:[
                {"name":"PERSON","desc":"姓名","color":"pink"},
                {"name":"TIME","desc":"时间","color":"yellow"},
                {"name":"LOCATION","desc":"地点","color":"purple"},
                {"name":"ORGANIZATION","desc":"组织机构","color":"red"},
                {"name":"CURRENCY","desc":"货币","color":"inverse"},
                {"name":"others","desc":"无含义词语","color":"blue"}
            ]
        };





       $.ajax({
       type:"POST",
       url:"http://119.23.24.250:9876/api/full_text_fenci",
       dataType:"json",
       data: {content:text},
       async:false,
       success: function(res){
           response=res;
       }
   });

        $.each(response.tagDesc,function(){
            _this.tagDesc[this.name]=this;
        });

        _this.tags=response.tags;


        return response;
    },
    initTag:function(){
        $("#tag-panel").html("");

        $.each(this.tagDesc,function(){
            var tagHtml='<span class="label label-lg label-'+this.color+'">'+this.desc+'</span>   ';
            $("#tag-panel").append(tagHtml);
        });



    },
    initResult:function(){

        var _this=this;


        $("#result-panel").html("");
        $.each(this.tags,function(k,v){
            var color=_this.tagDesc[k].color;
            $.each(v,function(){
                var tagHtml='<span class="label label-lg label-'+color+'">'+this+'</span>   ';
                $("#result-panel").append(tagHtml);
            });
        });

    }



}


//初始化词性类别
function initTag(tagList){
    $("#tag-panel").html("");

    $.each(tagList,function(){
        var tagHtml='<span class="label label-lg label-'+this.color+'">'+this.desc+'</span>   ';
        $("#tag-panel").append(tagHtml);
    });
}




jQuery(function($) {

    $("#analysis-btn").click(function () {
        var remoteAnalysis=analysisUtil.getRemoteAnalysis($("#txt-analysis").val());
        analysisUtil.initTag();
        analysisUtil.initResult();
    });

    $("#analysis-btn").click();

})