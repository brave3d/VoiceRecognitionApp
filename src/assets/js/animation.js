(function(){var actors={};actors.actor_1={node:document.getElementById("actor_1"),type:"circle",cx:50,cy:50,dx:25,dy:28,opacity:1};
actors.actor_2={node:document.getElementById("actor_2"),type:"circle",cx:50,cy:50,dx:36,dy:28,opacity:0.56};
actors.actor_3={node:document.getElementById("actor_3"),type:"circle",cx:50,cy:50,dx:45,dy:28,opacity:0.25};
var tricks={};tricks.trick_1=(function(_,t)
{t=(function(n){return.5>n?.5*function(n){return 1-function(n){return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}(1-n)}(2*n):.5*function(n)
{return 1/2.75>n?7.5625*n*n:2/2.75>n?7.5625*(n-=1.5/2.75)*n+.75:2.5/2.75>n?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375}(2*n-1)+.5})(t)%1,t=0>t?1+t:t;var i;i=0.23>=t?0.9-(0.9-1)/0.23*t:t>=0.93?1+(t-0.93)*((0.9-1)/(1-0.93)):1;var a=_._tMatrix,r=-_.cx*i+_.cx,x=-_.cy*i+_.cy,n=a[0]*i,c=a[1]*i,M=a[2]*i,g=a[3]*i,f=a[0]*r+a[2]*x+a[4],m=a[1]*r+a[3]*x+a[5];_._tMatrix[0]=n,_._tMatrix[1]=c,_._tMatrix[2]=M,_._tMatrix[3]=g,_._tMatrix[4]=f,_._tMatrix[5]=m});var scenarios={};scenarios.scenario_1={actors: ["actor_3","actor_2","actor_1"],tricks: [{trick: "trick_1",start:0.24,end:0.88}],startAfter:100,duration:2000,actorDelay:850,repeat:0,repeatDelay:0};var _reqAnimFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame,fnTick=function(t){var r,a,i,e,n,o,s,c,m,f,d,k,w;for(c in actors)actors[c]._tMatrix=[1,0,0,1,0,0];for(s in scenarios)for(o=scenarios[s],m=t-o.startAfter,r=0,a=o.actors.length;a>r;r++){if(i=actors[o.actors[r]],i&&i.node&&i._tMatrix)for(f=0,m>=0&&(d=o.duration+o.repeatDelay,o.repeat>0&&m>d*o.repeat&&(f=1),f+=m%d/o.duration),e=0,n=o.tricks.length;n>e;e++)k=o.tricks[e],w=(f-k.start)*(1/(k.end-k.start)),tricks[k.trick]&&tricks[k.trick](i,Math.max(0,Math.min(1,w)));m-=o.actorDelay}for(c in actors)i=actors[c],i&&i.node&&i._tMatrix&&i.node.setAttribute("transform","matrix("+i._tMatrix.join()+")");_reqAnimFrame(fnTick)};_reqAnimFrame(fnTick);})()
