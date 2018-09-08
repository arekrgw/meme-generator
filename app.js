
const app = new Vue({
    el: '#app',
    data: {
        text: {
            top:'',
            bott:'',
            fontSize: '40',
            image: './test.png',
        },
        fileSet: '<i class="fa fa-upload" aria-hidden="true"></i> Wybierz obrazek...'

    },
    watch:{
        top: function (newTop){
            this.drawAll();
        },
        bott: function (newBott){
            this.drawAll();
        },
        image: function(newImg){        
            this.drawText();
        }
    },
    methods:{
        readUserImage: function(e){
            var memeImg = e.target.files || e.dataTransfer.files;
            if(!memeImg.length) return;
            var createdImg = new Image;
            var reader = new FileReader;
            var vm = this;
            this.fileSet = 'Zmień...';
            
            reader.onload = function(e){
                vm.text.image = e.target.result;              
            };
            reader.readAsDataURL(memeImg[0]);
 
            
        },
        downloadImg: function(){
            var imgdata = document.getElementById('meme').toDataURL('png');
            var a  = document.createElement('a');
            a.href = imgdata;
            a.download = 'yourMeme.png';

            a.click()
        }
    },
    directives:{
        drawAll: function(el, binding){
            var ctx = el.getContext('2d');
            ctx.clearRect(0,0,500,500);
            var img = new Image;
            var canWidth, canHeight;
            
            img.onload = function(){
                if(img.width>0 && img.width<=1000){
                    canHeight = el.height = img.height;
                    canWidth = el.width = img.width;
                }
                else if(img.width>1000 && img.width<=2000){
                    canHeight = el.height = img.height/2;
                    canWidth = el.width = img.width/2;
                }
                else if(img.width>2000 && img.width<=3000){
                    canHeight = el.height = img.height/4;
                    canWidth = el.width = img.width/4;
                }
                else if(img.width>3000 && img.width<=4000){
                    canHeight = el.height = img.height/8;
                    canWidth = el.width = img.width/8;
                }
                else{
                    canHeight = el.height = img.height/10;
                    canWidth = el.width = img.width/10;
                }
                
                ctx.drawImage(img,0,0,canWidth,canHeight);
                
                var font = binding.value.fontSize;
                
                ctx.font = font + "px Impact";
                ctx.fillStyle = 'white';
                ctx.strokeStyle = 'black';
                ctx.textAlign = 'center';
                
                ctx.textBaseline = 'top';
                binding.value.top.split('\n').forEach(function(val, index){
                    ctx.fillText(val, canWidth / 2, index*font+10, canWidth);
                    ctx.strokeText(val, canWidth / 2, index*font+10, canWidth);
                });
                
                ctx.textBaseline = 'bottom';
                binding.value.bott.split('\n').reverse().forEach(function(val, index){
                    ctx.fillText(val, canWidth / 2, canHeight - index*font-10, canWidth);
                    ctx.strokeText(val, canWidth / 2, canHeight - index*font-10, canWidth);
                });
                
                
                
            }
            img.src = binding.value.image;

        }
    }

    
});


