$(document).ready(function(){
    var divMap = document.getElementById( "map-GDS" );
    var svg = document.createElementNS( "http://www.w3.org/2000/svg", "svg" );
    var viewBoxHeight=615;
    var viewBoxWidth=1500;
    var newX=0;
    var newY=-10;
    var index;
    createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
    moveMap();
    scrollSvg();
    zoomSvg();
    backBtn();

    /**
     * 移动svg
     */
    function moveMap(){
        $(document).mousedown(function(event){
            $("#map-GDS").css("cursor", "move");
                /* 获取需要拖动节点的坐标 */
                var offset_x = newX;//x坐标
                var offset_y = newY;//y坐标
                /* 获取当前鼠标的坐标 */
                var mouse_x = event.pageX;
                var mouse_y = event.pageY;
                $(document).mousemove(function(ev){
                    /* 计算鼠标移动了的位置 */
                    var _x = ev.pageX - mouse_x;
                    var _y = ev.pageY - mouse_y;
                    /* 设置移动后的元素坐标 */
                    newX = (offset_x + _x );
                    newY = (offset_y + _y );
                    /* 改变目标元素的位置 */
                    if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                      cleanSoming();
                      createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                    }
                    else{
                      cleanSoming();
                      createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                    }
                })
        });
        $(document).mouseup(function(){
            $("#map-GDS").css("cursor", "");
            $(this).unbind('mousemove');
        });
    }
    /**
     * 鼠标滚动上下方向
     */
    function scrollSvg(){
        // firefox
            document.body.addEventListener("DOMMouseScroll", function(event) {
                if(viewBoxWidth==1100)
                    viewBoxWidth=viewBoxWidth+100;
                if(viewBoxWidth==2900)
                    viewBoxWidth=viewBoxWidth-100;
                if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                     viewBoxWidth=event.detail && (event.detail > 0 ? viewBoxWidth-100 : viewBoxWidth+00);
                     if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                        cleanSoming();
                        createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                     }
                     else{
                        cleanSoming();
                        createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                     }
                 }

            });
            // chrome and ie
            document.body.onmousewheel = function (event) {
               if(viewBoxWidth==1100)
                    viewBoxWidth=viewBoxWidth+100;
               if(viewBoxWidth==2900)
                    viewBoxWidth=viewBoxWidth-100;
               if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 event = event || window.event;
                 viewBoxWidth= event.wheelDelta && (event.wheelDelta > 0 ? viewBoxWidth-100 : viewBoxWidth+100);
                 if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                    cleanSoming();
                    createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                  }
                 else{
                      cleanSoming();
                     createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                  }
                }
            };

    }
    /**
     * 返回按钮
     */
    function backBtn(){
      $("#back-btn").css("display","none");
      $("#back-btn").on("click",function(){
        location.reload();
      })
    }
    /**
     * 缩放按钮
     */
    function zoomSvg(){
        $(".zoomBig").on("click",function(){
            if(viewBoxWidth==1100)
                viewBoxWidth=viewBoxWidth+100;
            if(viewBoxWidth==2900)
                viewBoxWidth=viewBoxWidth-100;
            if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 viewBoxWidth=viewBoxWidth-100;
                 if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                    cleanSoming();
                    createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                  }
                 else{
                      cleanSoming();
                      createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                }
            }
        });
        $(".zoomSmall").on("click",function(){
            if(viewBoxWidth==1100)
                viewBoxWidth=viewBoxWidth+100;
            if(viewBoxWidth==2900)
                viewBoxWidth=viewBoxWidth-100;
            if(viewBoxWidth<=2800&&viewBoxWidth>1100){
                 viewBoxWidth=viewBoxWidth+100;
                 if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                  cleanSoming();
                  createSvg(newX,newY,viewBoxWidth,viewBoxHeight);
                }
                 else{
                  cleanSoming();
                  createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                }
            }
        });
    }

    /**
     * 创建svg元素
     */
    function createSvg(newX,newY,viewBoxWidth,viewBoxHeight){
        svg.setAttribute("class", "GDS");
        svg.setAttribute("viewBox", "0,85,"+viewBoxWidth+","+viewBoxHeight);
        svg.setAttribute("transform", "translate("+ newX + ","+ newY + ")");
        divMap.appendChild(svg);
        createProvinceGD();
    }

    /**
     *省份
     */
    function createProvinceGD(){
        var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
        var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
        svg.appendChild(g);
        path.setAttribute("class", "province-GD");
        path.setAttribute("d", map.province.path);
        path.setAttribute("value", map.province.provinceNme);
        g.appendChild(path);
        createCity();
    }

    /**
     * 市
     */
   function createCity(){
    for(var i=0;i<map.province.city.length;i++){
            var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
            var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
            svg.appendChild(g);
            path.setAttribute("class", "colorChange");
            path.setAttribute("d", map.province.city[i].path);
            path.setAttribute("value", map.province.city[i].cityName);
            var colorAndNumber=map.province.city[i].number*0.05;
            path.setAttribute("fill", "rgba(14, 85, 71, "+colorAndNumber.toFixed(2)+")");
            path.setAttribute("number", map.province.city[i].number);
            g.appendChild(path);
        }
        colorChangeMap();
    }

    /**
     * 鼠标移入移出地图样式改变
     */
    function colorChangeMap(){
        var fillColor;
        $(".colorChange").mouseover(function () {
              fillColor=$(this).css("fill");
              $(".testCity").append($(this).attr("value"));
              $(".testNumber").append($(this).attr("number"));
              $(this).css({
                            "stroke":"#099",
                            "fill":"#099",
                            "cursor":"pointer"
                            });
              $(document).mousemove(function(e){
                        $("#map-tip").css({
                            "left":e.pageX-46+"px",
                            "top":e.pageY-95+"px",
                            "display":"block"
                        });
                    });
        });
        $(".colorChange").mouseout(function () {
              $(this).css({
                            "stroke":"#999",
                            "fill":fillColor
                          });
              $(".testCity").empty('');
              $(".testNumber").empty('');
              $(document).mousemove(function(e){
                        $("#map-tip").css({
                            "left":0+"px",
                            "top":0+"px",
                            "display":"none"
                        });
                    });
        });
        intoCounty();
    }
    /**
     * 清空数据
     */
    function cleanSoming(){
          $("#map-GDS > svg").empty('');
          $(".map-tip").css("display","none");
          $(".testCity").empty('');
          $(".testNumber").empty('');
    }
    /**
     * 清空和隐藏提示框
     */
    function cleanTip(){
          $("#map-tip").css({
                             "left":0+"px",
                             "top":0+"px",
                             "display":"none"
                           });
    }
    /**
     * 点击进入县
     */
    function intoCounty(){
        $(".colorChange").click(function() {
            if($('#map-GDS > svg > g:nth-child(1) > path').attr("value")=="广东省"){
                cleanSoming();
                cleanTip();
                $("#back-btn").css("display","block");
                for(var i=0;i<map.province.city.length;i++){
                  if(map.province.city[i].cityName==$(this).attr("value")){
                      index=i;
                      viewBoxHeight=615;
                      viewBoxWidth=1500;
                      newX=0;
                      newY=-10;
                      createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight);
                      break;
                  }
                }
            }else{
                location.reload();
            }
        });
    }
    /**
     * 创建城市的svg
     */
    function createCountySvg(newX,newY,viewBoxWidth,viewBoxHeight){
        svg.setAttribute("class", "GDS");
        svg.setAttribute("viewBox", "0,85,"+viewBoxWidth+","+viewBoxHeight);
        svg.setAttribute("transform", "translate("+ newX + ","+ newY + ")");
        divMap.appendChild(svg);
        createCounty(svg,divMap)
    }
    /**
     * 创建城市
     */
     function createCounty(){
        var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
        var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
        svg.appendChild(g);
        path.setAttribute("class", "county");
        path.setAttribute("d", map.province.city[index].county.path);
        path.setAttribute("value", map.province.city[index].cityName);
        g.appendChild(path);
        createArea(svg,divMap);
     }
    /**
     * 创建区
     */
    function createArea(){
        for(var i=0;i<map.province.city[index].county.area.length;i++){
            var g = document.createElementNS( "http://www.w3.org/2000/svg", "g" );
            var path= document.createElementNS( "http://www.w3.org/2000/svg", "path" );
            svg.appendChild(g);
            path.setAttribute("class", "colorChange");
            path.setAttribute("d", map.province.city[index].county.area[i].path);
            path.setAttribute("value", map.province.city[index].county.area[i].areaName);
            var colorAndNumber=map.province.city[index].county.area[i].number*0.05;
            path.setAttribute("fill", "rgba(14, 85, 71, "+colorAndNumber.toFixed(2)+")");
            path.setAttribute("number", map.province.city[index].county.area[i].number);
            g.appendChild(path);
        }
        colorChangeMap();
    }
})