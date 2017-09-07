<template>
  <div id="app">

    <button v-if='!playing' @click='seqGen' :disabled='buttonDisabled'>Start</button>
    <button v-if='playing' @click='restart' :disabled='buttonDisabled'>Restart</button>
    <!-- {{ seq }} -->
    <div>Steps: {{ seq.length }} </div>
    <div class='button-grid'>
      <button :class="{ hightlight: isHightlight.one}" @click='valCheck' value='1'>1</button>  
      <button :class="{ hightlight: isHightlight.two}" @click='valCheck' value='2'>2</button>  
      <button :class="{ hightlight: isHightlight.three}" @click='valCheck' value='3'>3</button>  
      <button :class="{ hightlight: isHightlight.four}" @click='valCheck' value='4'>4</button>  
    </div> 

<div v-if='lose'>You Lost!</div>

  </div>
</template>

<script>
  export default {
    name: 'app',
    data(){
      return {
        seq: [],
        playing: false,
        turn: 4,
        counter: 0,
        score: 0,
        lose: false,
        buttonDisabled: false,
        isHightlight: {
          'one': false,
          'two': false,
          'three': false,
          'four': false,
        }
      }
    },
    methods: {
      seqPlayBack(){
      
        var loop = this.seq.length - 1;
        var i = 0;
        let sequence = this.seq;
        
        this.buttonDisabled = true;
            var looper = () => {
                console.log(sequence[i]);

                this.isHightlight[this.numToWord(sequence[i])] = true;

                if (i < loop) {

                setTimeout(()=>{
                    this.isHightlight[this.numToWord(sequence[i])] = false;
                    i++;
                 }, 300);

                } else {
                    this.buttonDisabled = false;
                   

                  setTimeout(() => {
                      this.isHightlight[this.numToWord(sequence[loop])] = false;
                      loop--;

                    }, 300);
                    
                    clearTimeout(looper);
                    return;
                }
        
                setTimeout(looper, 1000);
            };
        
        looper();
 
      },
      seqGen(){
        this.playing = true;
        this.lose = false;
        let number = Math.floor(Math.random() * (4 - 0) + 1);
        this.seq.push(number);
        this.seqPlayBack()
        this.counter = 0;
      },
      valCheck(e){
        if(this.seq[this.counter] != e.target.value && this.seq.length) {
          this.lose = true;
          this.counter = 0;
          this.score = 0;
          this.seq = [];
          this.playing = false;
          return;
        }
        this.lose = false;
        if(this.counter == this.seq.length - 1){
          this.counter = 0;
          this.score = this.score + 1;
          this.seqGen();
          return;
        }
        this.counter = this.counter + 1;
      },
      numToWord(num){
          if(num == 1){
            return 'one';
          } else if( num == 2) {
            return 'two';
          } else if(num == 3) {
            return 'three';
          } else if(num == 4){
            return 'four';
          }
      },
      restart(){
        this.playing = false;
        this.seq = [];
        this.turn = 4;
        this.counter = 0;
        this.score = 0;
        this.lose = false;
        this.buttonDisabled = false;
      }
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'hightlight': this.error && this.error.type === 'fatal'
        }
      }
    },
   
  }
</script>

<style lang="">

  .hightlight {
    background: hotpink;
  }

</style>