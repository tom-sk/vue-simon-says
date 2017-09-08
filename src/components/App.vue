<template>
  <div id="app">


    <!-- {{ seq }} -->
    <div class='steps'> {{ scoreCalc }} </div>
    <div class='tile-grid'>
      <button class='tile t1' :class="{ hightlight: isHightlight.one}" @click='valCheck' value='1'></button>  
      <button class='tile t2' :class="{ hightlight: isHightlight.two}" @click='valCheck' value='2'></button>  
      <button class='tile t3' :class="{ hightlight: isHightlight.three}" @click='valCheck' value='3'></button>  
      <button class='tile t4' :class="{ hightlight: isHightlight.four}" @click='valCheck' value='4'></button>  
      <div class='alert lose-alert' v-if='lose'>You Lost!</div>
      <div class='alert win-alert' v-if='win'>You Win!</div>

    </div> 
    
    <button class='button start' v-if='!playing' @click='seqGen' :disabled='buttonDisabled'>START</button>
    <button class='button reset' v-if='playing' @click='restart' :disabled='buttonDisabled'>RESTART</button>
    
    <div class='strict-mode-container'>
        <span>Strict Mode</span>
        <toggle-button :value="strict" :labels="true" @change="toggleStrict" />
    </div>

  </div>
</template>

<script>
  const delay = require('delay');
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
        win: false,
        strict: true,
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
        var i = 0, j = 0;
        let sequence = this.seq;
        
        this.buttonDisabled = true;
  
            var looper = () => {

              if(this.win == true){
                clearTimeout(looper);

                for(j = 1; j <= 4; j++){
                  this.isHightlight[this.numToWord(j)] = true;

                  delay(1000)
                    .then(() => {
                        for(j = 1; j <= 4; j++){
                          this.isHightlight[this.numToWord(j)] = false;
                        }
                    });
                }

                this.playing = false;
                this.buttonDisabled = false;
                this.win = false;
                this.seq = [];
                this.score = 0;
                return;
              }

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
        this.winCheck()
        this.counter = 0;
      },
      valCheck(e){
        if(this.seq[this.counter] != e.target.value && this.seq.length && this.strict === true) {
          this.lose = true;
          this.counter = 0;
          this.score = 0;
          this.seq = [];
          this.playing = false;
          return;
        } else if (this.seq[this.counter] != e.target.value && this.seq.length && this.strict === false) {
          this.seqPlayBack()
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
        this.win = false;
        this.buttonDisabled = false;
      },
      winCheck(){
        if(this.seq.length == 20){
          this.win = true;
        }
      },
      toggleStrict(){
        this.strict = !this.strict;
      }
    },
    computed: {
      classObject: function () {
        return {
          active: this.isActive && !this.error,
          'hightlight': this.error && this.error.type === 'fatal'
        }
      },
      scoreCalc(){
        if(this.score < 10){
          return '0' + this.score
        }
        return this.score;
      }
    },
  }
</script>

<style lang="">


  @font-face {
    font-family: "Bitstream Vera Serif Bold";
    src: url("C:/Users/Tom/Documents/test-folder/vue/sim/fonts/style-7_digital-7/digital-7.ttf");
  }


  #app {
    font-family: arial;
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width:300px;
    height:400px;
    margin:auto;
    background: #f5f5f5;
  }
  .steps {
    font-family: 'Bitstream Vera Serif Bold';
    font-size: 30px;
    width:40px;
    display: flex;
    justify-content: center;
    align-content: center;
    color: #00c853;
    background: #002;
    margin:10px;
  }
  .button {
    margin:10px;
    width: 100px;
    height: 30px;
    border: none;
    outline: none;
  }
  .start {
    color: white;
    background:#78909c;
  }
  .reset {
    color: white;
    background:#757575;
  }
  .tile-grid {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width:205px;
    border-radius: 10px;
  }

  .tile {
    border: none;
    outline: none;
    margin: 1px;
    width: 100px;
    height: 100px;
  }
  .tile:active{
    background: #4dd0e1;
  }
  .t1 {
    background: #03A9F4;
    border-top-left-radius: 100%;
  }
  .t2 {
    background: #00c853;
    border-top-right-radius:  100%;
  }
  .t3 {
    background: #ffd600;
    border-bottom-left-radius: 100%;
  }
  .t4 {
    background: #f44336;
    border-bottom-right-radius: 100%;
  }

  .hightlight {
    background: hotpink;
  }

  .lose-alert {
    background: #e57373;
  }
  .win-alert {
    background: #66bb6a;
  }
  .alert {
    position: absolute;
    top:0px;
    width: 205px;
    height: 205px;
    border-radius: 100%;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .strict-mode-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background:#d3d3d3;
    width:150px;
    height: 40px;
    margin: 4px;
  }
</style>