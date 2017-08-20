function vector(){
    line.call(this);
    var points='a,b,c,d'.split(',').map(function(name,index,arr){
        return {
            name:name,
            color:'hsl('+(360*index/arr.length)+',100%,60%)'
        }
    })
    var relation=400;
    var svg=document.querySelector('svg');
    var Vector=window.Vector;
    var k=0.05;
    var _self = this;
    function random(min,max){
        return Math.round(min+(max-min)*Math.random());
    }

    points.forEach(function(points, index){
        var circle=document.createElementNS('http://www.w3.org/2000/svg','circle');
        var x=random(0 , 100);
        var y=random(-100 , 100);
        circle.setAttribute('cx',x);
        circle.setAttribute('cy',y);
        circle.setAttribute('fill',points.color);

        svg.appendChild(circle)
        points.circle=circle;
        points.s=new Vector(x,y);
        points.v=new Vector();
        points.a=new Vector();
        // 文字
        points.index = index;
        points.vp = 'vp'+index;
        var text=document.createElementNS('http://www.w3.org/2000/svg','text');
        text.setAttribute('x',points.s.x + 25);
        text.setAttribute('y',points.s.y - 25);
        text.setAttribute('fill','#666');
        text.textContent = points.vp;
        svg.appendChild(text);
        points.text = text;
    })

    var lastFrameTime=+new Date();
    function undate(){
        var frameTime=+new Date();
        var t =frameTime-lastFrameTime;
        t/=200;
        //点位置更新；
        points.forEach(function(pa){
            var f=new Vector();
            //计算合力
            points.forEach(function(pb){
                if(pa==pb) return;
                var x=Vector.fromPoints(pa.s,pb.s);
                var delta=x.length()-relation;
                //f=k*x;
                f=f.add(x.normalize(delta*k))
            });
            pa.a=f;
            pa.v=pa.v.add(pa.a.multipy(t)).multipy(0.98);
            pa.s=pa.s.add(pa.v.multipy(t));
            pa.circle.setAttribute('cx',pa.s.x);
            pa.circle.setAttribute('cy',pa.s.y);

            //文字
            pa.text.setAttribute('x',pa.s.x + 25);
            pa.text.setAttribute('y',pa.s.y - 25);
        })
        // 点连线；
        var linkPath=[];
        points.forEach(function(pa){
            var sa=pa.s
            points.forEach(function(pb){
                if(pa==pb) return;
                var sb=pb.s;
                linkPath=linkPath.concat([
                    'M',sa.x,sa.y,
                    'L',sb.x,sb.y
                ]);
            })
        })

        //更新发射的线段
        _self.lineUpdate();

        document.querySelector('#links').setAttribute('d',linkPath.join(' '))
        lastFrameTime=frameTime;
        requestAnimationFrame(undate)
    }

    this.init = function () {
        requestAnimationFrame(undate);
    }

    this.getAllOptions = function () {
        return points;
    }

    this.rectActive = function (index) {
        var c = this.getOptions(index).circle;
        c.setAttribute('class','active');
        window.setTimeout(function () {
            c.removeAttribute('class')
        },2000);
    }

    this.getOptions = function (index) {
        for (var point in points){
            var point = points[point];
            if(point.index == index){
                return point;
            }
        }
    }

}

(function(){
    function Vector(x,y){
        this.x=x||0;
        this.y=y||0;
    }
    Vector.prototype={
        constructor:Vector,
        square:function(){
            return this.x*this.x+this.y*this.y;
        },
        length:function(){
            return Math.sqrt(this.square())
        },
        add:function(q){
            return new Vector(this.x+q.x,this.y+q.y)
        },
        minus:function(q){
            return new Vector(this.x-q.x,this.y-q.y)
        },
        multipy:function(scale){
            return new Vector(this.x*scale,this.y*scale)
        },
        normalize:function(length){
            if(length===undefined){
                length=1
            }
            return this.multipy(length/this.length())
        }
    };
    Vector.fromPoints=function(p1,p2){
        return new Vector(p2.x-p1.x,p2.y-p1.y)
    }
    window.Vector=Vector;
})();



