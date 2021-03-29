(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"gym_atlas_1", frames: [[0,0,1932,1193]]},
		{name:"gym_atlas_2", frames: [[868,1699,595,227],[1128,1220,595,227],[1128,1449,595,227],[0,1699,866,327],[0,1026,1126,671],[1465,1678,390,227],[0,0,1024,1024],[1667,1035,180,179],[1667,848,183,185],[1849,1035,113,166],[1026,0,668,362],[1026,364,518,388],[1546,364,415,482],[1128,848,537,370],[1696,0,304,362],[1914,848,77,76],[1026,754,96,130],[1852,848,60,130],[1026,886,72,130]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_21 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_20 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_19 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_18 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_17 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_16 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(5);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_15 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(6);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(7);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_13 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(8);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_12 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(9);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_11 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(10);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_10 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(11);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_9 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(12);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(13);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2591,1454);


(lib.CachedBmp_6 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(14);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_5 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(15);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_4 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(16);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(17);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_2 = function() {
	this.initialize(ss["gym_atlas_2"]);
	this.gotoAndStop(18);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_1 = function() {
	this.initialize(ss["gym_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.מיטתאימון = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_13
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(8,1,1).p("A24t8IAACgIAAFWA24mFIEUAFA28mGIAEABIAALqIOOAAIAAGuA28mGIAEAAIAAABA5YmIICcACAoRneIAAnKAoqENIAABYIZdAAIAAC+IC0AAA24FlIAAJEAZPIjIAKAAAMlIjIEOAAIAAFoAGzIjIAKAA");
	this.shape.setTransform(33,15.325);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#993333").s().p("AScKZIAAgyIAAgyIFoAAIAAAyIAAAygAFyKZIAAgyIAAgyIFoAAIAAAyIAAAygAp1E7IuOvTIJ2AAIPxPTg");
	this.shape_1.setTransform(40.5,8.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(2,1,1).p("AEgAAQAAB3hVBUQhUBVh3AAQh2AAhVhVQhUhUAAh3QAAh2BUhVQBVhUB2AAQB3AABUBUQBVBVAAB2g");
	this.shape_2.setTransform(-166.8841,-77.7506,0.8034,0.8647);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("AjLDLQhThUAAh3QAAh2BThUQBVhVB2AAQB3AABUBVQBVBUAAB2QAAB3hVBUQhUBVh3gBQh2ABhVhVg");
	this.shape_3.setTransform(-166.8841,-77.7506,0.8034,0.8647);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	// Layer_3
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(2,1,1).p("AEgAAQAAB3hVBUQhUBVh3AAQh2AAhVhVQhUhUAAh3QAAh2BUhVQBVhUB2AAQB3AABUBUQBVBVAAB2g");
	this.shape_4.setTransform(10.1159,-80.2506,0.8034,0.8647);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("AjLDLQhThUAAh3QAAh2BThUQBVhVB2AAQB3AABUBVQBVBUAAB2QAAB3hVBUQhUBVh3gBQh2ABhVhVg");
	this.shape_5.setTransform(10.1159,-80.2506,0.8034,0.8647);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).wait(1));

	// Layer_4
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(2,1,1).p("AFAAAQAACFheBdQhdBeiFAAQiEAAhdheQhehdAAiFQAAiEBehdQBdheCEAAQCFAABdBeQBeBdAACEg");
	this.shape_6.setTransform(-159.5,-78);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#666666").s().p("AjhDiQhehdAAiFQAAiEBeheQBehdCDAAQCEAABeBdQBeBeAACEQAACFheBdQheBeiEAAQiDAAheheg");
	this.shape_7.setTransform(-159.5,-78);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	// Layer_5
	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(2,1,1).p("AFAAAQAACFheBdQhdBeiFAAQiEAAhdheQhehdAAiFQAAiEBehdQBdheCEAAQCFAABdBeQBeBdAACEg");
	this.shape_8.setTransform(17.5,-80.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#666666").s().p("AjhDiQhehdAAiFQAAiEBeheQBehdCDAAQCEAABeBdQBeBeAACEQAACFheBdQheBeiEAAQiDAAheheg");
	this.shape_9.setTransform(17.5,-80.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8}]}).wait(1));

	// Layer_6
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#000000").ss(2,1,1).p("AFPAAQAACLhiBiQhiBiiLAAQiKAAhihiQhihiAAiLQAAiKBihiQBihiCKAAQCLAABiBiQBiBiAACKg");
	this.shape_10.setTransform(-152,-79);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#666666").s().p("AjsDtQhihiAAiLQAAiKBihiQBihiCKAAQCLAABiBiQBiBiAACKQAACLhiBiQhiBiiLAAQiKAAhihig");
	this.shape_11.setTransform(-152,-79);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10}]}).wait(1));

	// Layer_7
	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#000000").ss(2,1,1).p("AFPAAQAACLhiBiQhiBiiLAAQiKAAhihiQhihiAAiLQAAiKBihiQBihiCKAAQCLAABiBiQBiBiAACKg");
	this.shape_12.setTransform(25,-81.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#666666").s().p("AjsDtQhihiAAiLQAAiKBihiQBihiCKAAQCLAABiBiQBiBiAACKQAACLhiBiQhiBiiLAAQiKAAhihig");
	this.shape_13.setTransform(25,-81.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_13},{t:this.shape_12}]}).wait(1));

	// Layer_8
	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#000000").ss(8,1,1).p("Ax9AAMAj7AAA");
	this.shape_14.setTransform(-80.5,-80);

	this.timeline.addTween(cjs.Tween.get(this.shape_14).wait(1));

	// Layer_9
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#993333").ss(13,1,1).p("AwFAAMAgLAAA");
	this.shape_15.setTransform(86.5,41);

	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(1));

	// Layer_10
	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#000000").ss(8,1,1).p("AjlAAIHLAA");
	this.shape_16.setTransform(137.5,112);

	this.timeline.addTween(cjs.Tween.get(this.shape_16).wait(1));

	// Layer_11
	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#000000").ss(8,1,1).p("AjWAAIGtAA");
	this.shape_17.setTransform(-119,115);

	this.timeline.addTween(cjs.Tween.get(this.shape_17).wait(1));

	// Layer_12
	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#000000").ss(8,1,1).p("AjWAAIGtAA");
	this.shape_18.setTransform(-24,98);

	this.timeline.addTween(cjs.Tween.get(this.shape_18).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-199.5,-116,399,235);


(lib.ראש = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AIFNHQgKgDgRgOIgygrIgrgjIgrgiQgUgOgLgFQgPgJgdgGQgXgGgggDIgvgIQgZgEgMgGQgGgCgQgKQgOgJgJgEQgFgCgLgBIgQgCQgHgCgJgFIgQgIIgegJQgRAJgYgJQgJgEgMgGIgUgNQgsgZhCgMIh2gOQhugOhpgjQhugjg/g0QgbgYg0g8Qg4hDgVgjQgzhQgUhmQgSheAKhnQAEgvAKglIARg7QAXhFAPgkQAXg5AagqQA5hYBrhNQBDgwCKhLQAngUAVgGQAOgDASgBIAhgBQBfAAAvAFQBSAKBNAfQBMAfBBAyQALAHAFAJQAFACAFAFIAUAWQAOAMAWAEQANACAbAAICkAAQAdAAAMAIQAYAMAGAkQACAIAAAOIgDADQgFADgBAHQgBAEABADIgDABIgBADIgDAGIgBAJIAAAYIABAGIAFAFIADACIABgBIABgBIADABQANACAbAAQAXADALAMQAGAIAEASQAFAUAEAIQAFAIAUARQARAPAEAMIACAPQACAJADAFQAEAIATAHQAhANASAMQAaARAKAYQAMAagIAoQgQBfhBBEQgKAMgSAQQA6ATBAADQBFABBBgSQAPgFAIgBQANAAAIAHQAJAHgDARQAAAFgDAGIhjAZQhRAFgtgEQhJgEg1gYIhyBZIgZATIhoBNQgQAMgKABQgJgBgHgGQgHgGgBgJQgBgSAbgVQA0gmA0goIAcgWQBAgyA/gyQAygqAUgdQAMgRAMgcQAJgUAIgYIABgCIABgEIAAgCQAIgXgDgNIAAgBQgEgKgMgKQgLgJgYgKIgUgKIgIgEIgIgEQgTgLgLgSIgCgEIgDABQgLAAgGABIgOAGQgOAAgGACIgIACIgtARIgHAEQgEABgFgBQgIgDgEgFIAAAAIgCgBQgFgDgDgDIAAgBIgBgCQgCgFAAgEIAAgDQABgFAEgEIADgEQADgGABgMIADgKQAEgDABgDIABgHIAHgMIAEgKIAFgMIABgMQABgNAKgMIgCAAIgCAAQAAgDgCgCQgCgFgFgDQgEgDgDABIABgHIgGgFIgGgEQgFgEgCgLIAAgYIgDACQgGAEgGAHQgKALgFAJQgFAIgIASQgIANgNAFQgOAIgNgHQgFgCgJgIQgJgIgGgCQgGgDgPABQgPAAgHgEQgMgFgBgOQgBgOALgHQAHgFAQgBQARAAARACQAQACAHAHIADACQABAAAAAAQABAAAAgBQAAAAABgBQAAgBAAgBQAQgeAZgUQANgLAPgHIAIgDQgCgJgFgIQgEgGgGgCIgIgCIixgBIgpgBQgegCgQgMIgRgQQgQgPgGgIIgBgDQgPgFgUgRQhXhGhwgZQg3gLhpgEQgvgBgXAGQgeAGgwAbQhaAzhLA0QhNA0goAsQgxA2gkBPQgcA/gYBYQgTBJgGAwQgOCBAzB4QAiBRBJBYIAFAGQAmAsAhAcIAKAIQBHA2BnAfQBPAXCAAPIAFABIAbAEQBDAIAgAIQBDAQArAgIABgBQAOgNAhAQQArATAlALQAeAHALAFQAMAFAXANQANAFASAEIAhAEQBSALAqAXQARALATAOQAbAUAxAqIB/AfIhQBPIgDgIgAH+mvQgHAGgBAGIgBANQgBAGgGALIgCAKIgGAIIgEAMIgDAIIAAgBIABAAIAJgFIAJgEQAIgDATAAIAUgFIAHgBQgPgJgKgSQgHgNgGgZIgEAEg");
	this.shape.setTransform(0.0074,-0.5);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#EDD2B3").s().p("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");
	this.shape_1.setTransform(5.4722,-1.6653);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#000000").s().p("AkPGsQgJgCgRgJIgmgVQgWgLgJgHQgRgMgJgNQgHgJgDgKQgEgOAAgRQAAgPADgKIAOgXQAGgXAIgIQAEgDAJgEQAJgEADgDQAKgMAHgEQAJgHAQACQASABAGAKQAJAMgLAPQgGAIgRAJQgRAJgGAHQgGAHgGARQgHARgFAHQAKAKAFAOIAzAaIAdAQQAMAGAFABIAUAAIANAAQAIABAFgBQALgCAVgNIAqgaQAQgKAIgEQAWgKAaACQATACAHAJQAHAHgCALQgCALgJAFQgGAEgPAAQgPABgGADIgMAKQgMALgQAGQgUAIgDACIgLALQgJAHgPADQgJACgSAAIgoAAIgIAAQgOAAgKgDgAjTFKIgQAAQgGgCgJgJQgKgKgDgGQgFgJAAgPQAAgTAIgIQAFgGAIgBQAIgCAHAEQAHAEAEAHQAEAHgBAIQAHADANgLQAPgOAPgCQAJgBAIAFQAIAEADAIQADAIgEAJQgDAJgIAGIgPAKIgPAKIgLAJQgGAEgGABIgDAAIgLgBgAAAivQgHgGAAgKQAAgHAEgEIgBgGQgCgHAEgHIADgHIACgIIAFgNIAcg2QAEgHAIgIIAOgRQAGgHAIgCQAJgCAHAFQAHAEACAIQABAHgBAFIADAMIAMAPIAKAOIACAEQALgEAIACQAJADAEAHQAEAJgEAHQgDAGgLAGIgMAHQgIAEgJAHIgOAKIgMAGQgIAFgFABIgHACQgKAHgFACIgHAAQgDABgFAEIgHAGQgEACgIABIgFABQgLAAgGgEgABFkTIgSAhIgGANIACgBIAXgJQAHgDAJgGIAHgFIgKgLIgMgPIgCAEgAhcjUQgFgJAEgMIAHgOIAGgPQAAgRAEgHIAGgKIAEgMQAHgYAfgrQAcgpAZgLQAQgGAKAFQAKAFABALQABALgJAHQgGAEgOAFQgDACgGAHQgYAcgVAmIgHARIgCANQgCAFgHAIQgCAEgBAKQgCAUgMASQgJAOgLAAIgCAAQgJAAgGgLgAGAjnQgIgEABgKQABgJAIgCIADgBIACAAIABgBIABABQAJACADAFQADAFgCAGQgCAFgFADQgEADgDAAQgEAAgEgDg");
	this.shape_2.setTransform(3.2021,-23.4899);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FF9999").s().p("AgjApIACgGIAEgNIAGgIIACgJQAGgKABgGIABgNQABgGAIgHIAEgDQAEAZAHAMQAKASAPAIIgHABIgUAGQgRAAgJADIgJAEIgIAEIgBAAg");
	this.shape_3.setTransform(51.575,-39.9625);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#28A2FF").s().p("AgRAMIARggIACgEIAMAPIAKAKIgHAFQgJAGgHADIgWAJIgCABIAGgNg");
	this.shape_4.setTransform(10.1,-48.975);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#F2BC8D").s().p("AgQIuQgOgIgIgNIgDgGIAqAkQgIgDgJgGgAApo2IABABIgBAAIgBABg");
	this.shape_5.setTransform(43.875,20.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-93.6,-85.2,193.2,169.4);


(lib.whiteboard = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("EgnZAWdMAAAgs5MBOzAAAMAAAAs5g");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.whiteboard, new cjs.Rectangle(-252.2,-143.7,504.4,287.5), null);


(lib.V = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#00CC33").ss(2,1,1).p("AghgDIAXAiIAsg9");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_2
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#00CC33").ss(1,1,1).p("ABGAAQAAAdgVAUQgUAVgdAAQgcAAgUgVQgVgUAAgdQAAgcAVgUQAUgVAcAAQAdAAAUAVQAVAUAAAcg");
	this.shape_1.setTransform(-0.025,-0.075);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgwAxQgVgUAAgdQAAgcAVgUQAUgVAcAAQAdAAAUAVQAVAUAAAcQAAAdgVAUQgUAVgdAAQgcAAgUgVg");
	this.shape_2.setTransform(-0.025,-0.075);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.V, new cjs.Rectangle(-8,-8,16,15.9), null);


(lib.Symbol1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(5,1,1).p("AgEBiIAEhnIAFhc");
	this.shape.setTransform(40.525,26.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("ACMAAQAAA6gpApQgpApg6AAQg5AAgogpQgpgpAAg6QAAg5ApgoQAogpA5AAQADAAACAAQA3ACAnAnQApAoAAA5g");
	this.shape_1.setTransform(40.05,40.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#AFAFAF").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_2.setTransform(48.5,59.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#C6C6C6").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_3.setTransform(45.5,60.5);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#636363").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_4.setTransform(52.5,57.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#989898").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_5.setTransform(53.5,56.5);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#909090").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_6.setTransform(56.5,53.5);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#505050").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_7.setTransform(57.5,52.5);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#9F9F9F").s().p("AhAAtIAKAAQAAAFgDADQgCACgFAAIAAgKgAAZgOIAKAAQAAAFgDACQgCADgFAAIAAgKgAA3g2IAKAAQAAAFgCADQgDACgFAAIAAgKg");
	this.shape_8.setTransform(52.5,55.5);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#AAAAAA").s().p("AgiAjIg8AAIAAgKIA8AAIAKAAIAAAKIgKAAgABVgiIAKAAQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_9.setTransform(45.5,58.5);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#828282").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_10.setTransform(29.5,59.5);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#575757").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_11.setTransform(24.5,56.5);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#5E5E5E").s().p("AgCACQgCgCAAgEQAEAAADADQACABAAAFQgFAAgCgDg");
	this.shape_12.setTransform(23.5,55.5);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#A6A6A6").s().p("AgCACQgCgCAAgEQAEAAADADQACABAAAFQgFAAgCgDg");
	this.shape_13.setTransform(21.5,52.5);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#7A7A7A").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_14.setTransform(20.5,51.5);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#666666").s().p("AgCADQgCgDAAgEIAJAAIAAAJQgFAAgCgCg");
	this.shape_15.setTransform(31.5,60.5);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#A5A5A5").s().p("AgEAFIAAgJQAEAAADACQACACAAAFIgJAAg");
	this.shape_16.setTransform(32.5,60.5);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#C4C4C4").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_17.setTransform(21.5,26.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#8C8C8C").s().p("AgBADQgDgDAAgEQAEAAACACQADACAAAFQgFAAgBgCg");
	this.shape_18.setTransform(18.5,47.5);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#404040").s().p("AgBACQgDgCAAgEIAJAAIAAAJQgFAAgBgDg");
	this.shape_19.setTransform(17.5,45.5);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#B4B4B4").s().p("AgEAFIAAgJQAEAAACADQADABAAAFIgJAAg");
	this.shape_20.setTransform(17.5,43.5);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#CDCDCD").s().p("AgFAPIAAgKIAAgTIAJAAIABAJQAFAUgNAAIgCAAg");
	this.shape_21.setTransform(17.6188,36.5048);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#979797").s().p("AAmCFQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgAgfA1QgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgAgsiGIAKAAQAAAFgDADQgCACgFAAIAAgKg");
	this.shape_22.setTransform(22.5,44.5);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#A4A4A4").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_23.setTransform(19.5,29.5);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#414141").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_24.setTransform(19.5,28.5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#7D7D7D").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_25.setTransform(31.5,18.5);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#B8B8B8").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_26.setTransform(32.5,18.5);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#4A4A4A").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_27.setTransform(34.5,17.5);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#7F7F7F").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_28.setTransform(35.5,17.5);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#737373").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_29.setTransform(27.5,20.5);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#BCBCBC").s().p("AhAAPIAKAAQAAAFgDADQgCACgFAAIAAgKgAAjgYIAUAAIAKAAQAAAFgBAAQgOAFgPAAIAAgKg");
	this.shape_30.setTransform(32.5,19.5);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#9A9A9A").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_31.setTransform(29.5,19.5);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#646464").s().p("AgEgEIAJAAQAAAEgCADQgDACgEAAIAAgJg");
	this.shape_32.setTransform(22.5,24.5);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#5C5C5C").s().p("ABkC5IAKAAQAAAFgDACQgCADgFAAIAAgKgAhrB6QgCgCAAgFQAFAAADADQACACAAAFQgFAAgDgDgAhjjCIAKAAQAAAFgCADQgDACgFAAIAAgKg");
	this.shape_33.setTransform(33,42.5);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#525252").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_34.setTransform(61.5,42.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#7C7C7C").s().p("AgEAZIAAgKIAAgnIAJAAIAAAnIAAAKIgJAAg");
	this.shape_35.setTransform(61.5,39.5);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#4D4D4D").s().p("AA8C0IAKAAQAAAFgCADQgDACgFAAIAAgKgAC0gnIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAi9i9IAKAAQAAAFgDADQgCACgFAAIAAgKg");
	this.shape_36.setTransform(43,41);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#606060").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_37.setTransform(60.5,46.5);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#959595").s().p("AC+BkIAKAAQAAAFgCADQgDACgFAAIAAgKgAjHhtIAKAAQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_38.setTransform(40,38);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AhhBiQgpgpAAg5QAAg4ApgpQApgpA4AAIAFAAQA3ACAmAnQApApABA4QgBA5gpApQgpApg5ABQg4gBgpgpgAAAgiIAFhog");
	this.shape_39.setTransform(40.05,40.05);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#717171").s().p("AhWCTQgDgCAAgFIAKAAIAAAKQgFAAgCgDgAimB2QgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgACgiLIAAgKQAFAAADACQACADAAAFIgKAAg");
	this.shape_40.setTransform(44,47);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#B9B9B9").s().p("AgCADQgCgDAAgEIAJAAIAAAJQgFAAgCgCg");
	this.shape_41.setTransform(60.5,33.5);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#9E9E9E").s().p("AACANQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAgHgHQgCgCAAgFQAFAAADADQABACAAAFQgEAAgDgDg");
	this.shape_42.setTransform(59,29.5);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#676767").s().p("AgCACQgCgCAAgEQAEAAADADQACABAAAFQgFAAgCgDg");
	this.shape_43.setTransform(57.5,26.5);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#8E8E8E").s().p("AgCACQgCgCAAgEQAEAAADADQACABAAAFQgFAAgCgDg");
	this.shape_44.setTransform(56.5,25.5);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#A7A7A7").s().p("AgdClIAKAAQAAAFgCADQgDACgFAAIAAgKgAAXinQgDgCAAgFQAFAAACACQADADAAAFQgFAAgCgDg");
	this.shape_45.setTransform(53,41.5);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#BBBBBB").s().p("AgBADQgDgDAAgEQAEAAACACQADACAAAFQgFAAgBgCg");
	this.shape_46.setTransform(54.5,23.5);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#969696").s().p("AgBADQgDgDAAgEQAEAAACACQADACAAAFQgFAAgBgCg");
	this.shape_47.setTransform(53.5,22.5);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#838383").s().p("AizB4IAAgKIAKAAIAAAKIgKAAgAizAUIAAgKIAKAAIAAAKIgKAAgACthvQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCg");
	this.shape_48.setTransform(35,33);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#656565").s().p("AgCACQgCgCAAgEQAEAAADADQACABAAAFQgFAAgCgDg");
	this.shape_49.setTransform(49.5,19.5);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#C3C3C3").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_50.setTransform(50.5,20.5);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#474747").s().p("Ah3AtIAAgKIAKAAIAAAKIgKAAgABugiIAAgKQAFAAACADQADACAAAFIgKAAg");
	this.shape_51.setTransform(33,21.5);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#6E6E6E").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_52.setTransform(43.5,17.5);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#FDFDFD").s().p("AAyDcIgKAAIgKAAIg7AAIgKAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAIgKAAQAAgFgDgCQgCgDgFAAQAAgFgCgCQgDgDgFAAQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgCQgDgDgFAAQAAgFgCgDQgDgCgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgKIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgnQARABgGgWIgBgJIAAgKIAAgKIAAgKQAFAAACgCQADgDAAgFIAAgKQAFAAACgCQADgDAAgFIAAgKQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAAgKQAFAAADgDQACgCAAgFQAFAAADgCQACgDAAgFQAFAAACgCQADgDAAgFIAKAAQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAIAKAAQAPAAAOgFQAAAAAAgFIAKAAIAKAAIgEBbIAEhbQAAAFACACQADADAFAAIAKAAIAKAAIAKAAIAKAAQAAAFADACQACADAFAAIAKAAIAKAAQAAAFACACQADADAFAAQAAAFACADQADACAFAAIAKAAQAAAFADADQACACAFAAQAAAFADADQACACAFAAQAAAFADADQACACAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAQAAAFACACQADADAFAAIAAAKQAAAFACACQADADAFAAIAAAKQAAAFACADQADACAFAAIAAAKIAAAKQAAAFACACQADADAFAAIAAAKIAAAKIAAAKIAAAnIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAhXhXQgpApAAA4QAAA6ApApQApApA4AAQA6AAApgpQApgpAAg6QAAg4gpgpQgngng2gCIgGAAQg4AAgpApg");
	this.shape_53.setTransform(39,39);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#B6B6B6").s().p("ABaCRIAAgKIAKAAIAAAKIgKAAgAhhiJQgCgCAAgFIAKAAIAAAKQgFAAgDgDg");
	this.shape_54.setTransform(51,31.5);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#939393").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_55.setTransform(42.5,17.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#ACACAC").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_56.setTransform(46.5,18.5);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#030303").s().p("AAUGLIgxAAQAAgFgDgDQgCgCgFAAIgKAAIgKAAIgKAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAIgKAAQAAgFgCgCQgDgDgFAAQAAgFgCgDQgDgCgFAAQAAgFgCgDQgDgCgFAAQAAgFgCgDQgDgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAIAAgKQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgCQgDgDgFAAIAAgKIAAgKQAAgFgDgDQgCgCgFAAIAAgKIAAgKIAAgKIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgUIAAgKIAAgnIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKIAAgKQAFAAADgDQACgCAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKQAFAAADgDQACgCAAgFQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFIAAgKQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAADgCQACgDAAgFQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAKAAQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFIAKAAQAFAAACgCQADgDAAgFIAKAAQAFAAADgCQACgDAAgFIAKAAQAFAAADgCQACgDAAgFIAKAAQAFAAACgCQADgDAAgFIAKAAIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIA7AAIAKAAQAAAFADACQACADAFAAIAKAAIAKAAIAKAAIAKAAIAKAAQAAAFACACQADADAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAKAAQAAAFACADQADACAFAAIAKAAQAAAFACADQADACAFAAQAAAFACACQADADAFAAIAKAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAIAKAAQAAAFACADQADACAFAAIAAAKQAAAFACADQADACAFAAQAAAFACADQADACAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAIAAAKQAAAFADACQACADAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFACACQADADAFAAIAAAKQAAAFACACQADADAFAAIAAAKIAAAKIAAAKQAAAFACADQADACAFAAIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIAAAnIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAjbgsIAAAUIAAAKIAAAnIAAAKIAAAKIAAAKQAAAFADACQACADAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFACADQADACAFAAQAAAFACACQADADAFAAIAAAKQAAAFACACQADADAFAAQAAAFACACQADADAFAAQAAAFACADQADACAFAAIAKAAQAAAFADADQACACAFAAQAAAFADADQACACAFAAIAKAAQAAAFACADQADACAFAAIAKAAQAAAFACADQADACAFAAIAKAAIAKAAIAKAAQAAAFADACQACADAFAAIA7AAIAKAAQAFAAACgDQADgCAAgFIAKAAIAKAAQAFAAACgCQADgDAAgFIAKAAIAKAAQAFAAADgCQACgDAAgFQAFAAADgCQACgDAAgFIAKAAQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKQAFAAADgDQACgCAAgFIAAgKIAAgKIAAgKQAFAAACgCQADgDAAgFIAAgKIAAgnQAAgFgCgEQgDgGgFgFIAAgKIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgCQgDgDgFAAQAAgFgCgCQgDgDgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAIgKAAQAAgFgCgDQgDgCgFAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAIgKAAIgKAAIgKAAIgKAAIgJAAIgUAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKg");
	this.shape_57.setTransform(39,39.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,78,79), null);


(lib.sweat = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCAFQgBgGAGgHQAAABgBAAQAAABAAAAQAAABAAAAQAAABAAABIAAAGQAAAFgCABIAAAAQAAAAAAAAQAAgBgBAAQAAgBAAAAQAAgBgBgBg");
	this.shape.setTransform(-0.6382,0.0923);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#F7E5D0").s().p("AgIANQgEgEAAgEQgBgFAEgFQAGgIAEgDQADAAAFAJQAFAHAAAEQgBAFgEAEQgEAEgFAAQgEAAgEgEg");
	this.shape_1.setTransform(-0.0002,0);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.sweat, new cjs.Rectangle(-1.3,-1.7,2.7,3.4), null);


(lib.Scene_1_sideWalk = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sideWalk
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#E0E0E0").s().p("EhkoAFwIAArfMDJSAAAIAALfg");
	this.shape.setTransform(642.85,632.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_outlineDoors = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// outlineDoors
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0033FF").ss(4,1,1).p("AGqKOIHEABICv0nIpnAAgAGqKVIAAgHAnCCdIgDsuINvAAIAAUXItkAAgAm6KLIm4ABIiq0nIJXAAAm6KcIAAgRIAAgFIgLAAIADnp");
	this.shape.setTransform(641.125,531.7);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_gym_doors = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// gym_doors
	this.shape = new cjs.Shape();
	this.shape.graphics.rf(["#1585CB","#FFFFFF"],[0,1],0,1.3,0,0,1.3,73.1).s().p("Akwp6IJhgeIAAUtQhXgSlgAWg");
	this.shape.setTransform(566.325,529.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#1585CB","#FFFFFF"],[0,1],0,1.3,0,0,1.3,75.1).s().p("Ak4KVIAA0tIJxAeIiuUTQlqgWhZASg");
	this.shape_1.setTransform(715.075,530.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_front_gym = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// front_gym
	this.instance = new lib.CachedBmp_4();
	this.instance.setTransform(641.85,282,0.5,0.5);

	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(615.85,282,0.5,0.5);

	this.instance_2 = new lib.CachedBmp_2();
	this.instance_2.setTransform(584,282,0.5,0.5);

	this.instance_3 = new lib.CachedBmp_1();
	this.instance_3.setTransform(155,124.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(120));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_btn_BG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// btn_BG
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(204,204,204,0.886)").s().p("Ehj3A41MAAAhxpMDHvAAAMAAABxpg");
	this.shape.setTransform(639.175,356.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Scene_1_btn_BG, null, null);


(lib.right_door = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#0033FF").ss(4,1,1).p("ADbAAIAAKXIm1AAIAAqXgAjaAAIAAqWIG1AAIAAKW");
	this.shape.setTransform(0.025,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.rf(["#059FED","#10A3ED","#FFFFFF","#F8FAFE"],[0,0.153,0.737,1],0,0,0,0,0,69.9).s().p("AjaKXIAAqXIAAqWIG1AAIAAKWIm1AAIG1AAIAAKXg");
	this.shape_1.setTransform(0.025,0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.right_door, new cjs.Rectangle(-23.9,-68.3,47.9,136.6), null);


(lib.OpenWings = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_18();
	this.instance.setTransform(-216.4,-81.85,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.OpenWings, new cjs.Rectangle(-216.4,-81.8,433,163.5), null);


(lib.legscopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFCC33").s().p("AhUB+QgGgBgEgEQgFgFgBgKIACgQIAFgVIAEgJQACgFAIgKIAPgRIAJgTQAHgPALgLIAXgYIADgCIABgEQAFgJAIgCIAAAAQAEgHADgDQAEgEAJgDIANgHIALgNIANgPQAOgPAKAAQAIAAAFAHQAGAGgCAHQAAAGgHAIIgLAOQAAABgBAAQAAAAAAABQAAAAAAAAQAAABAAAAIACACQAHAHAAALQABALgHAHIgJAJIgGAJQgFAGgRALQgQAJgTARIgEAJIgRAoQgFANgGAHQgGALgIADQgLAEgIgIQgJgIAFgLQAHgJABgFQgGACgFAJQgCAGgBAKIgDANQgCAIgFADQgFAEgFAAIgCAAg");
	this.shape.setTransform(-164.7089,71.9278);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AARI2IgWhbQgJgogIgyQgTh2gOjgIgGhtQgBgWAChVIAAgHQAFh3AEgZIAWjHIAZgpQgTgCARABQAZACAIALQAIALgIAMQgBADgDACIgFADIgBAGIgYD5QgHA7gBAgQgCAzAHAoIAIA0QACAVgBA1QAAA2AFBbQAJB2ALA7QAIAsAKAlQAIAbADANQAEAWgCARIAAADQAHAIAAAHQABANgQAGQgMAFgRAAg");
	this.shape_1.setTransform(-278.5909,77.8719);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	// Layer_1
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#999999").s().p("Aq0MIIAAAAQgvhdgSiZIgRioQgRiugGhXQgGhigKgqIgMg2QgFggACgrIAQicQAKhegNg9QgGgaAEgOQAXgCAUABIAFAAIACAEQAFAMABAYIABBoQAAA6gFAtIgFAvQgDAagBAUQgBAYAGA8IASC6IAFAvIAKBiIANCGIACAPQAGgFAIgCQBJgaB/ABQCfAAAtgGQAtgHAagPQARgKAQgSQAJgKARgXQAdgnA9hbIAggyIAFgJQAQgZALgTIAag2QARghAOgUQALgRAWgZIAigpQAPgUAUgdIAhgyQA9hcCvjSIAcghIARgVQBPhfA5hQIBBAAQhGBhhnB9Qi+DkhDBiIg4BRIgfAoIgOARQgbAjgQAYQgIAOgdA0IgeA3QhJB/hdB0QgbAigVAOQgfAVg1AHQgcAFhAABIg3ABIg4AAQh+gBhJAYQgSAHgNAAIABAEQAHBFAFAiQAHA6AMAsQAPA7AWAtQAKAXABAIQAAAIgDAHQgZgFgbgKgAuwJYIgIgXQgFgMgKgDIAAAAQgDgZgDgNIgLgkQgHgWgDgOQgDgQABgXIABgoQACg1gHhIIgPh9QgVi6ANh9QALhOAEgnQAHg+gFg6IgBgXIAJgCQAGgCAFgJIAHgJIABgBQAKgBAHgHQADAEACAHQACAIAAANIgCBMQgBAugCAkQgCAfgHA6IgDAYIgCAVQgDAqAAAuIAAAbQABA9AGBFIAdELIATC9IAGA3IAAAGQACAYgJAHQgQgSgFgUgAn8CfIgegGIgbgHIgCAAIgDgBIgNgCQgigDg3ADQgRABgNgCIgCgBQgUgCgLgJIgBgCQgLgKACgSIABgGQADgOAOgCQAGgBASAGQANAEAlAEIB3ALIAGABIAIABQAsADAcgEQAvgGAagbQAIgIAVghQAcgrBIhGQBLhJAbgoQAXgiAag6QAkhOAJgRQAZgwAng2QAXgfA1hAQBThoBQhpIBBAAQhHBdhKBcIgHAIIgKANQg6BIgSAXQgyBDgeA5IgSAlIgLAWIggBAQgkBLgjAqQgUAYg9A5Qg1AxgYAjIgYAmQgOAXgOAMQgXAUgpANQgtAOglAAIgUgBgAP1r8QgJgHgMgPIgCgEIAnAAIgNAcIgDgCg");
	this.shape_2.setTransform(-177.1104,73.825);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("AqfMuQg4gJhAggQgogThIgtQgygfgZgaQglglgEgpQgBgQAIgNQAJgPANAEIABAAQAJACAGANIAHAXQAGATAQATIANANQALALAWAOIATANIAmAXQAtAbAdAOQAbANAaAKQAbAJAaAFIAOADQAlAGBCgBIAsgBQAZgCASgDIAmgIIAlgIQAhgEA/AIQBCAJAegCQAagCAxgNIBEgSQAtgLAUgHQAkgNAbgPQAZgPAsgmICKh2QA6gzAYgeIAGgIQABgFAEgDIABgGIAHgbQAKgqAOhWIAbilQAOhVASgtQALgeAXgoIAeg0IAAgFQADgPATgWQArgyBMhsQAZgjAKgTIAUglQAKgQAWgWIATgTIAgghIAZgaQAqgtAagnIAagoQAPgYANgPIALgLIAJgRIAMgbIAOgbIA7AAIgjBJQgSAkgOANIgGAGIgjA1QgdAug7A+Ig9A+QgSATgKANIgRAcQgfA4hJBiIg1BHIgFAHQg4BTgbBFIgKAfQgMAngGApIgEAdIgBAFIgIAkQgDALgGA2QgFArgOBEIgPBQQgEATgFAGIgDAEQgEAQgOAQQgJALgTAQIjWC2QgdAYgTANQgcASgoAOQgXAJgxANQhOAVgrAHQhEALg2gIIgkgGQgWgEgPAAQgRAAgXAFIgoAJQggAGgqACIhLABQhAAAglgFgArDkLQgJgDgGgIQgHgJACgJQAEgPAdgGICmgnQAZhEAOgiQAXg3AZgqIAVgiIAUgjQAKgSALgbIAUguQALgaAZgzIANgaIA8AAQgVAigJATQgNAXgPAnIgaBAQgLAZg9BrQgsBRgPA4IgIAcQgGAQgLAIQgJAIgYAGIiSAiQgQAEgLAAIgLgBgAwgnjQgLgJAEgOQABgGAGgFIAJgKIABAAIAAgHIADgKIACgIQABgEADgEIABgCIABgCQAKgLAPAAIAIAAIAGACIAEgCQAtgLAXgEQAjgGAngCIAzAAIA1ADQATABATADQAfAFAlAIIBOAQIAdAGIAJgNIAFgGQALgRAJgXQAGgQAKgiIAWhNIAWhMIA2AAQgOAvgQA9QgQA8gIAaIgCAGIgEAMQgNAjgQAbIgEAHQADADABAFQACAIgGAJQgGAIgKACQgLAEgagGQg2gMhDgMIg7gLQgpgHgigCIgGAAIgFgBQgUAAgWABIgSACIg1AHIg6ANIgEABIgCABIgFAKIgFAGQgHAHgKACIgCAAIgGAKQgGAIgFACIgJACIgFAAQgOAAgIgGg");
	this.shape_3.setTransform(-174.8516,76.675);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#0066CC").s().p("AooL5QgcgOgtgbQgIgHgEgFIgugYQgVgOgMgLIgNgNQAJgIgCgXIAAgGIAFABIgLg5IgTi8IgdkLQgGhGgBg9IADgFQACgJgEgLIgBgBQAAgvADgqIAFAAIAAgtQAHg5ACggQACgkABgtIAChNQAAgMgCgJIACgCIAFgHQgBgNABgGIAAAAIAEgBIA6gNIA2gHIARgCQgEAOAGAaQANA9gKBeIgQCcQgCArAFAhIAMA2QAKApAGBiQAGBYARCuIARCoQASCZAvBcIAAAAQgagJgcgNgAoRF5IAFgJIABgEIgDgEQgHgNgBgaQAAgggBgIQgDgMAAgHQAAgJgBgFIgDgGIgKhiIABgBQAEgFAFgCIABABQALAJAUADIABABIABgBQANACARgBQA3gDAiAEIALACIADABIAEAAIAbAGIAeAGQArAGA7gTQApgMAXgUQAOgNAOgWIAYgnQAYgjA1gwQA8g6AUgYQAjgqAkhKIAghAIAMgUIgBAAIAAgDIASglQAfg5AyhCQASgYA6hIIAKgNIAHgHQBKhcBHhdIEQAAQg5BPhPBfIgIAIQgQAPgVAfQivDSg9BcIghAzQgUAdgPATIgiApQgWAZgLARQgOAVgRAhIgbA1QgLATgQAaIgGAIIABABIggAxQg9BbgdAoQgRAWgIALQgQARgRAKQgaAQgtAGQgtAHifgBQh/AAhJAZQgIADgGAEg");
	this.shape_4.setTransform(-196.5125,73.0875);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFCC33").s().p("ArqMVIgOgCQADgHgBgIQAAgIgKgXQgWgtgQg7QgLgsgIg6QgFgigHhFIAAgEQAMAAATgHQBIgYB/ABIA4AAQAMAFAJACQAQADAJgFQAEgBAFgFQBAgBAcgFQA0gHAggVQAUgOAcgiQBch0BKh/IAPAFIAIgNQAJgQAWgeIAYgxQAPgkAMgPQAFgIAHgGQACgOAEgPIAggoIA4hRQBChiC+jkQBoh9BGhhIFOAAIADAEQAMAPAIAHIADACIgMAbIgJARIgLALQgNAOgPAYIgaAoQgaAngqAtIgZAbIgLgBIgVAhIgTATQgWAXgKAPIgUAmQgKATgZAjQhMBsgrAyQgTAWgDAOIAAAFIgeA0QgXAogLAeQgSAugOBUIgbClQgOBWgKArIgHAbIgBAFQgEAEgBAEIgGAIQgYAfg6AyIiKB2QgsAmgYAPQgbAQgkAMQgVAHgtAMIhEARQgxANgaACQgeADhCgJQg/gIghAEIglAHIgmAIQgSAEgZABIgsABIgSABQg1AAgggGgAq/CMIAMABIgBABIgLgCgAGJBxQAGgpAMgoIgOBGIgIAnIAEgcgAqABkIgGgFIgCADIAAABIgGgBIh3gLQgmgEgNgEQgSgGgGABQgNACgEAOIgGgDIgTi7QgFg8ABgYQAAgUADgaIAGgvQAEgtABg6IgChoQgBgYgFgMIAEgEQAiACApAHIA7ALQBDANA2AMQAaAFALgDQAKgDAGgIQAGgIgCgJQgBgEgDgEIAEgGQAQgbANgkIAGgFIgCgHIACgGQAIgZAQg8QAQg9AOgwIBLAAIgNAaQgZAzgLAaIgUAvQgLAbgKASIgUAiIgVAjQgZApgXA4QgOAhgZBEIimAnQgdAHgEAPQgCAJAHAIQAGAIAJADQANAEAZgGICSgjQAYgGAJgHQALgIAGgQIAIgdQAPg4AshQQA9hsALgZIAag/QAPgnANgYQAJgSAVgjIHgAAQhPBqhTBnQg0BAgXAfQgpA2gZAwQgJARgjBOQgbA6gWAiQgcAohKBJQhIBGgdArQgVAhgHAIQgaAbgvAGQgPACgSAAQgSAAgVgBgAqMlJIABABIABACIABgDIAAgBIgDABgAiLlMIABACIAAABIgMATIALgWgAqUoZIAIgDIANgGQALgEALgBIgFAHIgJANg");
	this.shape_5.setTransform(-165.0702,74.2071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-284.8,-5.2,216.5,163.79999999999998);


(lib.legsanimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(5,1,1).p("ADVAAQAABWg+A9Qg/A+hYAAQhXAAg/g+Qg+g9AAhWQAAhVA+g+QA/g9BXAAQBYAAA/A9QA+A+AABVg");
	this.shape.setTransform(0,0.025);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("AiVCTQg/g9AAhWQAAhVA/g+QA+g9BXAAQBYAAA+A9QA/A+AABVQAABWg/A9Qg+A+hYAAQhXAAg+g+g");
	this.shape_1.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.legsanimation, new cjs.Rectangle(-23.8,-23.3,47.6,46.7), null);


(lib.legs = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_17();
	this.instance.setTransform(-281.4,-167.75,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-281.4,-167.7,563,335.5);


(lib.innerclock3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AillpIhUCRAD6E/IihArACKgFIiQBS");
	this.shape.setTransform(-3.5,-3.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-41,51.9,74.5);


(lib.innerclock2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AillpIhUCRAD6E/IihArACKgFIiQBS");
	this.shape.setTransform(-3.5,-3.775);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-29.4,-41,51.9,74.5);


(lib.innerclock = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(2,1,1).p("AjXlcIhUCRAEsEyIihArAB4gmIiQBS");
	this.shape.setTransform(0,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-30.9,-35.9,61.9,71.9);


(lib.hand_weightcopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAKIAAgKIAAgJQAEAFADAFQACAEAAAFIgJAAg");
	this.shape.setTransform(-255.5,18);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.565)").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_1.setTransform(-255.5,-17);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.42)").s().p("AgEC0IAAgKIAJAAIAAAKIgJAAgAgCisQgCgCAAgFIAJAAIAAAKQgFAAgCgDg");
	this.shape_2.setTransform(255.5,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.412)").s().p("AajPUIAAiMIAKAAIAAAKQAHBTgRA5IAAgKgA6pPdQgFhKAAhLQARA6gHBSIAAAKIgFgBgAaotIQgFhKAAhLQARA5gHBTIAAAKIgFgBgA6utRIAAiMIAKAAIAAAKQAHBSgRA6IAAgKg");
	this.shape_3.setTransform(0.125,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.435)").s().p("AaaQQIAKAAQAAAFgDADQgCACgFAAIAAgKgA6gQYQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgANKQOQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAtRQGIAKAAQAAAFgCADQgDACgFAAIAAgKgANIwPIAKAAQAAAFgCADQgDACgFAAIAAgKgAtPwHQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAadwRQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgA6jwZIAKAAQAAAFgDADQgCACgFAAIAAgKg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.996)").s().p("AYYSIIpOAAQAAgFgBAAQhhgWgWhdQAAgFgCgDQgDgCgFAAIAAgKIAApsIgKAAI6FAAIAAJsIAAAKIgKAAIAAAKQAAAFgCAEQgiBRhUAeIgKAAIpOAAQAAgFgBAAQhggSgXhXQAAgFgDgDQgCgCgFAAIAAgKIAAgoIABgKQAGhSgRg6IgKAAQiYAGiAgQQAAgFgCgCQg3gfghg0IgBgKQgQiZAHixIgKAAIjSAAQAAgFgCgBQiKhPhah9QAAgFgCgEQgDgGgFgFIAAgKIAAk/QAFgFADgGQACgEAAgFIAAgKIAAgKQBghyCEhPQACgCAAgFIDSAAIAKAAQgHixAQiZIABgKQAhg0A3ggQACgBAAgFQCAgQCYAGIAKAAQARg6gGhSIgBgKIAAgKIAAgoQAFAAACgCQADgDAAgFIAAgKIAAgKQAkhABTgVQABAAAAgFIJOAAIAKAAQBUAeAiBRQACAEAAAFQAAAFACADQADACAFAAIAAJsIAAAKIaFAAIAKAAIAApsIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKQAihHBUgYQACAAAAgFIJOAAIAKAAQBTAbAjBKQACAEAAAFQAAAFADADQACACAFAAIAAAoIAAAKQAABLAFBKIAFABID6AAIAKAAQBNAcAlBGQABACAFAAQAQCZgGCxIAAAKIDSAAIAKAAQCGBXBeB9QACADAAAFQAAAFACACQADADAFAAIAAFJIAAAKIgKAAIAAAKQAAAFgCADQheB9iGBXIgKAAIjSAAIAAAKQAGCxgQCZQgFAAgBACQglBGhNAcIgKAAIj6AAIgKAAIAACMIAAAKIAAAoIAAAKIgKAAIAAAKQAAAFgCAEQgjBKhTAbIgKAAg");

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAKIABgKIABgKQADAGADAGQABADAAAGIgJgBg");
	this.shape_6.setTransform(-256.0437,-9.9);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.565)").s().p("AgEAAIABgJIAJABQAAAFgDADQgDAGgFAEIABgKg");
	this.shape_7.setTransform(-252.15,-44.75);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.42)").s().p("AgXCyIAAgKIAKABIgBAKIgJgBgAARirQgDgCAAgGIAKACIgBAKQgEgBgCgDg");
	this.shape_8.setTransform(254,27.8);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,0,0,0.412)").s().p("AYwSIIAPiMIAKABIgBALQgCBTgXA3IABgKgA8JMfQADhLAIhLQALA7gQBSIgBAKIgFgBgAb7qIQADhLAIhLQALA8gQBRIgBAKIgFgBgA5GwGIAPiLIAKABIgBAKQgCBTgXA4IABgLg");
	this.shape_9.setTransform(-0.0095,-0.05);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(0,0,0,0.435)").s().p("AYeTMIABgKIAKABQAAAFgEACQgCADgDAAIgCgBgALURjQgCgCABgFQAFAAACADQACADAAAFQgFgBgDgDgAu9OuIABgKIAKABQAAAFgDACQgCACgEAAIgCAAgA8JNZQgBgDAAgFQAFABACADQADACgBAFQgFAAgDgDgAcEtTQgDgDABgFQAFABADACQABADAAAFQgFAAgCgDgAOzujIABgKIAKABQgBAFgCACQgCACgEAAIgCAAgArZxdQgCgDAAgFQAFAAACADQADADgBAFQgFgBgCgCgA4ozCIABgKIAKABQAAAFgDADQgCACgEAAIgCgBg");
	this.shape_10.setTransform(0,-0.0458);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(0,0,0,0.996)").s().p("AWRUqIpLhAQABgEgBAAQheghgMheQAAgGgCgCQgCgDgFgBIABgKIBDpoIgKgBI56i2IhEJpIgBAJIgKAAIgBAJQgBAFgCAFQgqBLhXAWIgKgBIpLhBQABgFgBAAQhdgcgOhZQABgFgDgDQgCgDgFAAIABgKIAFgoIABgKQAQhRgMg7IgKgBQiXgKh9geQABgFgDgDQgzgkgbg4IABgKQgBiZAbiwIgKgBIjRgXQABgFgCgBQiBhdhLiFQAAgGgCgDQgCgHgEgGIABgKIAjk9QAFgFAEgFQACgFAAgEIABgKIACgKQBshmCMhCQACgBAAgFIDRAXIAKABQANixAgiWIACgKQAmgxA6gZQACgBACgEQCAgDCXAXIAKABQAXg3AChTIABgKIABgKIAEgoQAFABADgCQADgDAAgFIACgKIABgJQAqg9BVgLQABAAAAgFIJLBBIAKABQBRAnAYBTQACAEgBAFQAAAGACACQACADAFABIhDJoIgBAKIZ6C2IAKABIBEppIABgJQAFAAADgCQACgCABgFIABgKIABgKQAqhEBWgNQACgBAAgFIJLBAIAKACQBPAkAbBNQACAFgBAEQgBAFADADQACADAFAAIgEAoIgCAKQgHBKgEBLIAGABID4AbIAKACQBJAkAdBJQABACAFABQAACagaCvIgBAKIDRAXIAKABQB7BkBQCGQACADgBAFQAAAGADACQACADAEABIgkFHIgBAKIgKgBIAAAKQgBAFgDADQhrByiOBIIgKgBIjRgXIgBAKQgNCwghCXQgFAAgBABQgtBBhPAUIgKgBIj5gbIgKgBIgPCLIgBAKIgEAoIgBAKIgKgBIgBAKIgDAIQgrBHhVARIgKgCg");

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("rgba(0,0,0,0.42)").s().p("AgDC0IgBgKIAKgBIAAALIgJAAgAgCisQgDgCAAgFIAJAAIABAKQgFAAgCgDg");
	this.shape_12.setTransform(255.475,-0.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("rgba(0,0,0,0.412)").s().p("A6mPjQgFhKAAhKQASA4gHBTIAAAKIgGgBgAamPOIAAiMIAKAAIABAKQAHBTgRA5IgBgKgA6ytLIAAiMIAKAAIABAKQAHBTgRA5IgBgKgAaltOQgGhKAAhLQASA6gHBRIAAAKIgEABIgBgBg");
	this.shape_13.setTransform(0.0521,0);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("rgba(0,0,0,0.435)").s().p("A6cQeQgDgDAAgFQAFAAACADQADACAAAFQgFAAgCgCgAaeQKIAKAAQAAAFgDACQgCADgFAAIAAgKgAtNQJIAKAAQAAAFgDADQgCACgFAAIAAgKgANOQKQgCgCAAgEQAFgBACADQADACAAAGQgFAAgDgEgAtSwFQgDgCAAgGQAFAAADAEQACACAAAEIgCABQgDAAgCgDgANEwSIAKAAQAAAFgCACQgCADgGAAIAAgKgA6nwTIAKAAQAAAEgCADQgDACgFABIAAgKgAaZwYQgDgCAAgFQAFAAACACQADADAAAFQgFAAgCgDg");
	this.shape_14.setTransform(-0.05,0);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("rgba(0,0,0,0.996)").s().p("A4eSJQhggSgXhXQAAgFgDgCQgCgDgFAAIAAgKIAAgoIAAgKQAHhSgSg5IgKAAQiYAHiAgRQAAgFgCgCQg3gegig0IAAgKQgSiZAHixIgKAAIjRAAQgBgFgCgBQiLhOhah9QAAgFgCgEQgDgGgFgFIAAgJIgBk/QAFgFADgGQACgFAAgFIAAgKIAAgKQBghyCEhQQACgCAAgFIDRAAIAKAAQgHixAQiZIAAgKQAhg1A3gfQACgBAAgGQCAgRCXAHIALgBQARg5gHhSIgBgKIAAgLIAAgoQAFAAADgCQACgDAAgFIAAgJIAAgLQAkhABTgUQABgBgBgFIJPgCIAKAAQBVAdAhBRQACAEAAAFQAAAFADADQACACAFAAQACE2AAE2IAAAKIaFgFIAKAAIgCptIAAgKQAFAAADgDQACgCAAgFIAAgKIAAgKQAihHBUgYQABAAAAgFIJOgDIAKABQBTAaAkBKQACAFAAAEQAAAFACACQADADAFAAIAAAoIAAAKQAABLAGBLIAFAAID6gBIAKAAQBNAcAlBFQABADAFAAQARCZgGCxIAAAKIDSgBIAKAAQCGBWBfB9QACADAAAFQAAAFADADQACACAGAAIAAFJIABAKIgLAAIABAKQAAAFgDADQhdB+iGBXIgKAAIjSABIAAAKQAHCwgQCaQgFAAAAACQgmBFhMAdIgLAAIj5ABIgKAAIAACMIABAKIAAAoIAAALIgKAAIAAAJIgCAJQgjBKhTAcIgKgBIpOADQAAgFgBAAQhhgVgWhdQAAgGgDgCQgCgDgFABIgBgLIgCpsIgKAAI6FAGIACJsIABAKIgLAAIABAKQAAAFgCAFQghBQhVAfIgKAAIpOACQAAgFgBAAg");
	this.shape_15.setTransform(-0.025,-0.025);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAAIgCgJQAGAEADAFQADAEABAEIgJACIgCgKg");
	this.shape_16.setTransform(-250.225,55.15);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("rgba(0,0,0,0.565)").s().p("AgDABIgBgKIAJgBQABAFgCAEQgBAGgEAGIgCgKg");
	this.shape_17.setTransform(-255.4679,20.5);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("rgba(0,0,0,0.42)").s().p("AATCpIALgCIABALIgKABIgCgKgAgaipQgDgCgCgFIAKgCIADAKIgDAAQgEAAgBgBg");
	this.shape_18.setTransform(252.75,-37.375);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("rgba(0,0,0,0.412)").s().p("A4BTMQgQhJgLhKQAaA2AFBTIABAKIgEAAIgBAAgAclLQIgViKIAKgBIADAKQASBQgIA7IgCgKgA8UpOIgUiKIAKgCIACAKQATBRgJA7IgCgKgAYgw4QgRhJgLhKQAbA2AFBTIABAJIgFACIAAgBg");
	this.shape_19.setTransform(-0.4162,-0.0375);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("rgba(0,0,0,0.435)").s().p("A30UFQgDgCgBgFQAFgBADACQADACAAAFIgCAAIgFgBgAqxR3IALgBQAAAFgCADQgCADgFAAIgCgKgAPaOHQgCgCgBgEQAFgCACADQADACABAGIgBAAQgEAAgDgDgAchMPIAKgCQAAAFgCACQgCADgFABIgBgJgA8qsWIAKgBQABAFgCADQgCADgFAAIgCgKgAvcuBQgDgCgBgFQAFgBAEADQACACABAEIgDABQgBAAgBAAQAAAAgBgBQAAAAgBAAQAAAAgBgBgAKnx/IAKgBQACAFgDACQgCADgFABIgCgKgAXyz+QgCgCgBgFQAFAAACABQADADABAEIgCABQgEAAgCgCg");
	this.shape_20.setTransform(-0.1208,-0.05);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("rgba(0,0,0,0.996)").s().p("A1pVcQhigEgkhTQAAgEgCgCQgEgDgFABIAAgKIgHgnIgBgKQgFhTgag2IgKACQiVAciBACQgBgFgCgCQg7gWgpguIgCgKQgniVgSiwIgKABIjQAeQgBgFgCAAQiVg6hqhvQgBgFgDgDQgDgGgHgEIgBgJIguk9QAFgGABgGQACgFgBgFIgCgJIgBgKQBOh/B4hhQACgCgCgFIDQgeIAKgCQggiugHiaIgBgKQAZg4AygnQACgCAAgFQB7gjCXgPIAKgCQAKg7gUhRIgCgKIgBgKIgGgoQAFgBACgCQACgEgBgEIgBgJIgBgLQAahEBPghQABAAgBgFIJIhWIAKgCQBZARArBLQADAEABAFQABAFACACQADACAFgBIBbJmIABAKIZ0j0IAKgBIhbpmIgCgKQAFgBACgDQADgCgCgFIgBgKIgBgKQAXhMBRgjQABAAgBgFIJHhXIALgBQBVAOAuBFQADAEABAEQAAAFACACQAEACAFgBIAGAoIABAKQAKBKARBJIAFgBID3gkIALgBQBPARAvA/QABACAGgBQAmCVATCxIACAJIDQgeIAJgCQCRBDBwBtQADADAAAFQACAFADACQACACAGAAIAvFGIACAKIgLACIACAJQABAFgDADQhJCLh5BoIgJABIjQAfIABAKQAgCtAHCaQgGABAAACQgbBLhHAnQgFABgGAAIj2AlIgLABIAVCKIACAKIAGAoIABALIgKABIACAKIgBAIQgYBPhOAnIgLABIpHBWQAAgBAAgBQgBgBAAAAQAAgBAAAAQgBAAAAAAQhjgHgjhZQgBgFgCgDQgDgCgFABIgCgKIhaplIgKABI50D0IBbJmIACAKIgLABIACAKQABAFgCAFQgUBThQArIgKABIpIBXQAAgFgBAAg");
	this.shape_21.setTransform(0.05,-0.025);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAAIgBgJQAFAFADAFQACADABAGIgJAAIgBgKg");
	this.shape_22.setTransform(-254.775,27.55);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("rgba(0,0,0,0.565)").s().p("AgEAAIAAgJIAJgBQABAGgCAEQgDAFgEAFIgBgKg");
	this.shape_23.setTransform(-256.1607,-7.4);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("rgba(0,0,0,0.42)").s().p("AACC0IgBgKIALgBIAAALIgKAAgAgIisQgDgCAAgFIAKAAIABAKQgGgBgCgCg");
	this.shape_24.setTransform(255.275,-9.65);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("rgba(0,0,0,0.412)").s().p("A6BQdQgIhLgDhKQAUA5gEBTIAAAJIgFAAgAbIOTIgFiMIAKAAIABAKQAKBSgPA6IgBgKgA7MsQIgFiMIAKAAIABAKQAKBSgPA6IgBgKgAaIuHQgIhKgDhLQAUA5gEBSIAAAJIgEABIgBAAg");
	this.shape_25.setTransform(-0.1408,-0.05);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("rgba(0,0,0,0.435)").s().p("A53RXQgDgCAAgFQAFgBADAEQACABAAAFQgFAAgCgCgAsqQmIALgBQAAAFgDADQgCACgFAAIgBgJgANxPtQgCgCAAgFQAFgBACADQADACAAAGQgFAAgDgDgAbAPQIAKAAQAAAEgCACQgCAEgFAAIgBgKgA7JvZIAKAAQAAAFgCADQgDACgFAAIAAgKgAt1vmQgCgDgBgGQAFAAAEADQABACABAFIgCAAQgEAAgCgBgAMgwuIAKAAQABAFgDACQgCADgGAAIAAgKgAZ0xRQgCgDAAgEQAEAAADACQACACABAFIgCABQgEAAgCgDg");
	this.shape_26.setTransform(-0.125,-0.05);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("rgba(0,0,0,0.996)").s().p("A32S+QhggPgbhWQAAgFgCgBQgDgEgFABIAAgLIgCgoIAAgJQAEhTgTg5IgLAAQiXANiBgMQAAgFgCgCQg4gdgjgyIgBgKQgXiYABiyIgKAAIjSAHQAAgEgBgBQiPhKhdh5QgBgGgCgDQgDgGgGgFIgBgJIgLk/QAFgFADgGQACgEgBgGIAAgJIAAgLQBbh1CChUQACgDAAgFIDRgHIAJgBQgMiwALiZIAAgKQAeg2A2ghQACgCAAgGQB+gUCYABIAMgBQAOg6gKhSIgBgKIAAgLIgBgoQAEAAAEgCQABgDAAgFIAAgJIAAgLQAhhBBSgYQABAAAAgFQEmgMEngKIAKgBQBXAcAkBOQABAFAAAEQABAGACADQADACAFgBIAYJsIAAAJIaDg+IALAAIgXpsIgBgKQAGAAACgDQADgCgBgFIAAgKIAAgKQAehJBUgaQABgBAAgFIJNgWIALAAQBTAXAnBJQACAEAAAFQAAAEACADQADADAFgBIABApIAAAKQAEBLAIBKIAEgBID6gJIALAAQBNAaAnBEQADABAFAAQAVCZAACyIABAJIDTgHIAJgBQCJBSBjB5QACADAAAFQABAFACACQADACAFABIAMFIIABAKIgLABIABAKQAAAEgCADQhZCDiDBbIgKAAIjRAIIAAAKQAMCwgKCZQgFABgBACQgjBHhLAgQgFAAgFAAIj6AJIgKAAIAFCMIABAKIABAoIAAALIgJAAIAAAKIgCAIQgfBMhTAeIgKgBIpOAYQAAgGgBAAQhhgRgZhcQgBgGgDgCQgCgDgFABIgBgKIgXpsIgKABI6EA+QANE2ALE3IAAAJIgKABIABAJQAAAFgCAFQgfBRhTAiIgKAAIpOAWQAAgEgBAAg");
	this.shape_27.setTransform(-0.05,-0.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1,p:{x:-255.5,y:-17}},{t:this.shape,p:{x:-255.5,y:18}}]}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]},4).to({state:[{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_1,p:{x:-255.6458,y:-16.075}},{t:this.shape,p:{x:-255.525,y:18.9}}]},5).to({state:[{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16}]},5).to({state:[{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22}]},5).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-256.7,-137.7,513.2,275.4);


(lib.hand_weight = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAKIAAgKIAAgJQAEAFADAFQACAEAAAFIgJAAg");
	this.shape.setTransform(-255.5,18);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.565)").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_1.setTransform(-255.5,-17);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.42)").s().p("AgEC0IAAgKIAJAAIAAAKIgJAAgAgCisQgCgCAAgFIAJAAIAAAKQgFAAgCgDg");
	this.shape_2.setTransform(255.5,0);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.412)").s().p("AajPUIAAiMIAKAAIAAAKQAHBTgRA5IAAgKgA6pPdQgFhKAAhLQARA6gHBSIAAAKIgFgBgAaotIQgFhKAAhLQARA5gHBTIAAAKIgFgBgA6utRIAAiMIAKAAIAAAKQAHBSgRA6IAAgKg");
	this.shape_3.setTransform(0.125,0);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.435)").s().p("AaaQQIAKAAQAAAFgDADQgCACgFAAIAAgKgA6gQYQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgANKQOQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAtRQGIAKAAQAAAFgCADQgDACgFAAIAAgKgANIwPIAKAAQAAAFgCADQgDACgFAAIAAgKgAtPwHQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAadwRQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgA6jwZIAKAAQAAAFgDADQgCACgFAAIAAgKg");

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.996)").s().p("AYYSIIpOAAQAAgFgBAAQhhgWgWhdQAAgFgCgDQgDgCgFAAIAAgKIAApsIgKAAI6FAAIAAJsIAAAKIgKAAIAAAKQAAAFgCAEQgiBRhUAeIgKAAIpOAAQAAgFgBAAQhggSgXhXQAAgFgDgDQgCgCgFAAIAAgKIAAgoIABgKQAGhSgRg6IgKAAQiYAGiAgQQAAgFgCgCQg3gfghg0IgBgKQgQiZAHixIgKAAIjSAAQAAgFgCgBQiKhPhah9QAAgFgCgEQgDgGgFgFIAAgKIAAk/QAFgFADgGQACgEAAgFIAAgKIAAgKQBghyCEhPQACgCAAgFIDSAAIAKAAQgHixAQiZIABgKQAhg0A3ggQACgBAAgFQCAgQCYAGIAKAAQARg6gGhSIgBgKIAAgKIAAgoQAFAAACgCQADgDAAgFIAAgKIAAgKQAkhABTgVQABAAAAgFIJOAAIAKAAQBUAeAiBRQACAEAAAFQAAAFACADQADACAFAAIAAJsIAAAKIaFAAIAKAAIAApsIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKQAihHBUgYQACAAAAgFIJOAAIAKAAQBTAbAjBKQACAEAAAFQAAAFADADQACACAFAAIAAAoIAAAKQAABLAFBKIAFABID6AAIAKAAQBNAcAlBGQABACAFAAQAQCZgGCxIAAAKIDSAAIAKAAQCGBXBeB9QACADAAAFQAAAFACACQADADAFAAIAAFJIAAAKIgKAAIAAAKQAAAFgCADQheB9iGBXIgKAAIjSAAIAAAKQAGCxgQCZQgFAAgBACQglBGhNAcIgKAAIj6AAIgKAAIAACMIAAAKIAAAoIAAAKIgKAAIAAAKQAAAFgCAEQgjBKhTAbIgKAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand_weight, new cjs.Rectangle(-256,-116,512,232), null);


(lib.hand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AgBD/QgDAAgCAAQgPgCgLgMQgCgBgBgCQgLgNAAgRQAAgTAOgOQALgLAQgDQACAAADAAQACAAACAAQAPABALAKQACABABACQAOAOAAATQAAAUgOAOQgNANgUAAIgBAAIAAgGAgHFLIAGhMAAECcIAinm");
	this.shape.setTransform(0.3509,0);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#CCCCCC").s().p("AAAAvQgQAAgMgLIgEgDQgOgOAAgTQAAgTAOgNQAOgOASAAIAGAAIAFABQANADAJAKIAEADQgMgJgPgBIgEAAIgGAAQgOACgMALQgNAOgBASQAAARAMANQgMgNAAgRQABgSANgOQAMgLAOgCIAGAAIAEAAQAPABAMAJQAKAMAAARQAAATgOAOQgLALgQADIgBAAIgFAAgAAlgdIAAAAg");
	this.shape_1.setTransform(-0.2989,20.15);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand, new cjs.Rectangle(-5.8,-34.6,12.399999999999999,69.2), null);


(lib.muscle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_15();
	this.instance.setTransform(-256,-256,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("A6oapQrCrDAAvmQAAvmLCrCQLCrCPmAAQPnAALBLCQLDLCAAPmQAAPmrDLDQrBLCvnAAQvmAArCrCg");
	this.shape.setTransform(-4.3,-0.425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.muscle, new cjs.Rectangle(-256,-256,512,512), null);


(lib.innerFancopy = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.instance = new lib.CachedBmp_13();
	this.instance.setTransform(-45.5,-46.1,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	// Layer_1
	this.instance_1 = new lib.CachedBmp_14();
	this.instance_1.setTransform(-45.1,-44.8,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.innerFancopy, new cjs.Rectangle(-45.5,-46.1,91.5,92.5), null);


(lib.hand_weight_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("rgba(0,0,0,0.255)").s().p("AgEAKIAAgKIAAgJQAEAFADAFQACAEAAAFIgJAAg");
	this.shape_6.setTransform(-255.5,18);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("rgba(0,0,0,0.565)").s().p("AgEAAIAAgJIAJAAQAAAFgCAEQgDAFgEAFIAAgKg");
	this.shape_7.setTransform(-255.5,-17);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("rgba(0,0,0,0.42)").s().p("AgEC0IAAgKIAJAAIAAAKIgJAAgAgCisQgCgCAAgFIAJAAIAAAKQgFAAgCgDg");
	this.shape_8.setTransform(255.5,0);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("rgba(0,0,0,0.412)").s().p("AajPUIAAiMIAKAAIAAAKQAHBTgRA5IAAgKgA6pPdQgFhKAAhLQARA6gHBSIAAAKIgFgBgAaotIQgFhKAAhLQARA5gHBTIAAAKIgFgBgA6utRIAAiMIAKAAIAAAKQAHBSgRA6IAAgKg");
	this.shape_9.setTransform(0.125,0);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("rgba(0,0,0,0.435)").s().p("AaaQQIAKAAQAAAFgDADQgCACgFAAIAAgKgA6gQYQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgANKQOQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAtRQGIAKAAQAAAFgCADQgDACgFAAIAAgKgANIwPIAKAAQAAAFgCADQgDACgFAAIAAgKgAtPwHQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAadwRQgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgA6jwZIAKAAQAAAFgDADQgCACgFAAIAAgKg");

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("rgba(0,0,0,0.996)").s().p("AYYSIIpOAAQAAgFgBAAQhhgWgWhdQAAgFgCgDQgDgCgFAAIAAgKIAApsIgKAAI6FAAIAAJsIAAAKIgKAAIAAAKQAAAFgCAEQgiBRhUAeIgKAAIpOAAQAAgFgBAAQhggSgXhXQAAgFgDgDQgCgCgFAAIAAgKIAAgoIABgKQAGhSgRg6IgKAAQiYAGiAgQQAAgFgCgCQg3gfghg0IgBgKQgQiZAHixIgKAAIjSAAQAAgFgCgBQiKhPhah9QAAgFgCgEQgDgGgFgFIAAgKIAAk/QAFgFADgGQACgEAAgFIAAgKIAAgKQBghyCEhPQACgCAAgFIDSAAIAKAAQgHixAQiZIABgKQAhg0A3ggQACgBAAgFQCAgQCYAGIAKAAQARg6gGhSIgBgKIAAgKIAAgoQAFAAACgCQADgDAAgFIAAgKIAAgKQAkhABTgVQABAAAAgFIJOAAIAKAAQBUAeAiBRQACAEAAAFQAAAFACADQADACAFAAIAAJsIAAAKIaFAAIAKAAIAApsIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKQAihHBUgYQACAAAAgFIJOAAIAKAAQBTAbAjBKQACAEAAAFQAAAFADADQACACAFAAIAAAoIAAAKQAABLAFBKIAFABID6AAIAKAAQBNAcAlBGQABACAFAAQAQCZgGCxIAAAKIDSAAIAKAAQCGBXBeB9QACADAAAFQAAAFACACQADADAFAAIAAFJIAAAKIgKAAIAAAKQAAAFgCADQheB9iGBXIgKAAIjSAAIAAAKQAGCxgQCZQgFAAgBACQglBGhNAcIgKAAIj6AAIgKAAIAACMIAAAKIAAAoIAAAKIgKAAIAAAKQAAAFgCAEQgjBKhTAbIgKAAg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.hand_weight_1, new cjs.Rectangle(-256,-116,512,232), null);


(lib.directionarrow = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(-211.9,-103.65,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-211.9,-103.6,259,194);


(lib.CloseWings = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(-52.75,-120.55,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.CloseWings, new cjs.Rectangle(-52.7,-120.5,207.5,241), null);


(lib.clock_ring = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiaFbIgCguQALgHAOAAQAOAAAMAHQAKgeAageQARgUAigeQBDg9AmgZQBag9CZgmQBVgVBSgMQAJAagXAYQgWAWggAFQgOACgtgBQglgBgVAHQgSAGgiAVQghAWgTAFQgIADgnAEQgdAEgQAJQgPAKgPAXQgVAggEAFQgMANgcATQgdAVgMALQgJAKgSAaQgQAZgLALQgRARgXAEIgLABQgRAAgMgMgAnzAQIAAguQALgGAMAAQAOAAAMAHQAKgeAageQARgUAigeQBEg9AmgZQBag9CZgmQBUgWBSgMQAJAagXAZQgWAWggAFQgOACgtgBQgkgBgVAHQgSAGgiAVQghAWgTAFQgIADgnAEQgdAEgQAJQgPAKgPAXQgVAggEAFQgMANgcATQgeAVgMALQgJAKgSAaQgQAZgLAKQgRARgXAEIgLABQgRAAgMgMg");
	this.shape.setTransform(0.0117,0.0006);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.clock_ring, new cjs.Rectangle(-49.9,-35.9,99.9,71.8), null);


(lib.BODY = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_2
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AixGyQgJgEgFgNIgShAIAAgSIABABIAAgBIgKg5QgKg+ABg2QAEh/BRiRQATgkARgWQAdgoA5gxQBMhBBPgtIAEgCIBLhBIAGAEQAKAJgDAQQgCAMgKAOQgLASgNAOQgNAOgTAPIglAXQhhA+gzA3QgtAvghA9QgRAggXA9QgaBFgFArQgHAzAMBJIAXB8QADAYgFALQgDAJgIAEQgGAEgFAAIgGgBg");
	this.shape.setTransform(-201.1988,81.1542);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	// Layer_3
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#E7A97B").s().p("A8fSIQgIgBgDgJQgDgIAEgHQADgGAIgFIANgJQA7gkAbg+QAHgRAKgjIACgGQAQg6AahGIAMgeQAYg6Afg2QAhg4AfgYQARgNAzgZQAsgWAUgUIAIgJIAbgMIADAAIAFAEQAEAEABADIAAAAQgBALgNALIgYAWQgOAPgLAGQgIAFgNAFIgWAIQhUAig6B+QgMAagPAqIgiBeIgaBNIgGAQQgLAbgNAaQgNAZgMAMQgKAKgVAMQgXAOgJAHQgLAKgHAAIgBAAgAhOKhQgjAAgSgCQgXgDgygNQgLgDgCgFQgCgDABgGQACgFAFgDQAIgEALABQALACATAFIAdAHQATADAiAAIA7AAQAlAAASgDQARgEAjgNQA+gWBYgTQApgIAkgEQAQgCDLgGIgRAkQi6AAgQADIgPACQhSAPgqALQglAJghAMQgjANgSAEQgQAEgUABIgkAAgAzEF0QgOgBgIgFQgEgCgFgFIgGgHQgCgDAAgJQAAgLACgEQAHgMATABQAHAAAEADQAEAEADAAIAMgCQAJgBAGAEQAIAGgDAJQgBAEgJAFIgFABIgDADIgCAGIgDAHIgEAHQgDADgGAAIgDgBgAxXE3IgKgFIgKAAQgNAAgMgEIgKgEQgQgHgagEQgbgDgKgFIgNgGQgFgCgMAAIhEAAIgYABQgVADgbAMQgYALgMgBQgJgBgEgFQgHgHAEgGQACgEAHgEQATgKAggJQAXgHAIgBQALgBAYAAIA9AAQAbAAANAFQALAFAHADQAJADAQACQAXADAZAIQAXAHADAAIAMAAQAHAAAEABQAGADAGAHQAGAGABAGQAAAEgDAEQgEAEgEABIgFABQgGAAgIgEgAVoqlIgDgCIgDgFQgDgFACgFQADgHAPgDQAZgHAngXQAtgaAQgHIABAAIAKgHQAHgEgBADIAAAAQgBAIgFAQIgFAPQgCADgHADIgMAFIAAAAIgyAdIgUALIgFADQgOAGgNACIgFAAQgKAAgEgDgATgrsQgGgCgEgGQgEgHADgGQADgFAJgDICNg1IBoglIA9gVQAagLAxgXIBYglIADAEQAHAOgBABIgEALIgDABIAAABIgBAAQgJADgLAGIgdANIg4AZQgqATgmAOIkEBfQgOAEgHAAIgFAAgAYusXIABAAQAHACABAKQAAAKgGAGQgFAGgJADIgHADQAHgYALgQgASfs2QgFgHAGgIQAFgHAKgGIBPgsQAigSALgFQAVgJATgHIBNgcIBFgbQAmgRAagTIAagVQAQgMALgHQAXgPAxgRQAzgSAWgMQANgIAcgUIAHgFQADAGAKAFQACACABAEIABADIAAAJQg2AphHAXQgnANgLAFQgQAIgXASIgkAcQgcATgnARQgZALguARIh+AvQgLAGguAeQgjAXgZAGIgKACQgIAAgEgGgAcbyHIAAAAIAAAAg");
	this.shape_1.setTransform(34.9357,-14.5957);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#EDD2B3").s().p("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");
	this.shape_2.setTransform(-1.3878,8.744);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#000000").s().p("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");
	this.shape_3.setTransform(2.4946,9.4966);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.shape_1}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-225,-143.4,450.3,305.8);


(lib.BG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_7();
	this.instance.setTransform(-650.2,-360.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-650.2,-360.5,1295.5,727);


(lib.backHand = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EDD2B3").s().p("A11IjIAAgBIACgBQA/ggBohGIAXgQIDGiGQAggVAmgbIABgBIAHgFIAjgbIAPgKIAdgTQAegQA1gVIEoh1IA7gXIE3hzQC1hFCdhXQAGAEAGAAQALgBAIgLIANgVQAOgYAqgiIEtj4QAqgiAXgPQAWgOBFgiQA6gcAdgXIAZgXIAagVQArgjBYgZQBtgfAfgPQAUgJAzghIAGAEIAKgDIACgFIACgGQACgEACgBIABgBQA7gmAogMQgHAqghAcQgSAOAEAKIAAACQADAGAKAGQACABABAFIABACIAAAJIAAABIgCAUIACAQIABABIgEAGIAAABQgCALgEACQgCACgGADIgIACIgVAIIgQAHIgDAAIgDACIgXAMQgSAMgDAEIgFAEIgCACIAAACIgEAGQgMAWAJAQIALANQAHAOgBABIgEALIgDABIAAABIgBAAIAAAAIgBACIgBABIgGAHQgBABgBAAQgBABAAAAQgBAAAAAAQAAABABAAIgQAJIgCABIgeAMIgXAQIgEADIgYAOQgUAOgSATIgCABIgDABIgDADIABACIgBABQgWAcgEAPIAAAAQgBAJgFAPIgFAPIgDAIIgEAGIgHAFIgHAEIgCAFQAAABgBAAQAAABAAABQAAAAgBABQAAAAAAAAQgJAIgPAIIAAABIgFAAIgFAAIgDAFIgDAEQhFArhRA9QhYBCg3A6QgIgCgOABQg1AGg3AQQhDASgNADQgzAGgYAJQgQAFgUAPIgDgCIgNAKIABABQAAAAAAABQAAAAAAABQAAAAAAAAQAAABAAAAIgBAAIgbAYQg6A4hOBUQgeAgggAoIgEABIgQATIgxA4IgeAiIAAAMIgsAuIhXBQIgGAGQgNANgXATIglAhQhtBjhTBBIgKAIQgTgLgfAeQgaAaglAaQgXAQguAdIhlBAQhCAqgiAPQgYALgnAOIg/AYIgCAAIgPAHIlwBjg");
	this.shape.setTransform(43.525,1.65);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("A82PUIABAFIgGAAIAFgFgAnIO7IACAAIA/gYQAngOAYgLQAigQBCgpIBlhAQAugdAXgQQAlgaAZgaQAfgeATALIAKgIQBThBBthjIAlghQAXgUANgNIAGgFIBXhQIAtguQAUgVAPgUQATgXAkgvIAJgMQAggnAeghQBOhUA6g3IAbgYIABAAIAPgNQAUgOAQgGQAYgIAzgGQANgDBDgTQA3gPA1gGQAOgCAIADQA3g6BYhCQBRg+BFgqIAQgJIAAgBQAPgIAJgIQAJgHAJgLIAEgGIADgIIAFgPQAFgQABgIIAAAAQAEgQAWgbIABgBIAHgHQASgUAUgNIAYgOIA7ggIAQgKQgBAAAAAAQAAAAABAAQAAgBABAAQABgBABAAQAGgEAGgIIAEgLQABgBgHgOIgLgNQgJgQAMgWIAEgGIAHgIQADgEASgMIAXgMIAGgDIAQgHIAVgHIAIgDQAGgCACgCQAGgEACgDQACgJAAgEIgBgCIgCgPIACgUIAAgBIAAgJIgBgDQgBgEgCgCQgKgFgDgGIAAgCQgEgKASgPQAhgcAHgpQgoAMg7AmIgBABIgYAPQgzAhgUAJQgfAPhtAfQhYAZgrAiIgaAWIgZAWQgdAYg6AcQhFAhgWAPQgXAPgqAiIktD4QgqAhgOAZIgNAVQgIALgLAAQgGABgGgEQidBXi2BEIk3B0Ig6AWIkoB2Qg1AVgeAQIgdATIgPAKIgjAbIgHAFIgBABQgmAbggAVIjGCGIgXAQQhoBGg/AgIgCABIAAAAIgBACIABgQQADglgDgTQASgOAYgNIA5gdIAbgNQBVg3BthJIAggWQArgdAggXIAEgDIAggaQAWgRARgKQAagQA9gZICxhJQCGg3BUgfIA/gXIBighQDthTDch1QAVgLAOgBQAKgJAJgHQCjh6CoiSQBCg5AigVQAUgMAygXQAugWAYgQQARgLAigcQAhgaATgMQAtgdBdgbQBRgYArgTIACAAIAHgCIAFAAIAIgEQAFgCACgEIAAAAIACgCIAEgCQAEgCABgDQABAAAAAAQABAAAAAAQABAAAAgBQABAAAAAAIADgDIABgBIA0gjQAQgLAQgIIAMgGIAVgJIAIgFIAMgFQAJgDAIAAIAUBLQgLAXgTATQADAqAAAvQAAARgFAJQgFAIgKAEIgTAGQgxAOgmAjQAPALADAWQADAUgKASQgPAcgrAWIgjAQQgVAKgNAJQgXAOgSAbQgLAQgHAYIgGAWQgEAOgFAIQgJARgVAOIgoAWQgXANgoAeIg9AtQhEAzgbAXQg0ArgiApQgOARgKACQgHACgIgEIgDgDIgZAAQgZACgvARQgwARgYACIgdACIgDAAIgNACIgSAFQgSAHgYAXQiJCDh0CSQgiArgSAVQgRATgZAZQgXAXgeAbIjFCyIglAhIgIAGIgsAlIgGACQgBgEgFgBQgEgCgEACQgFADgHAJQgQAbgbAZIgTgEQgaAWgdAWIiuBvIkYBLIAPgHgA1GMKIADgBIgBAGIgCgFgAwrK3IACADIgCABg");
	this.shape_1.setTransform(0.025,-3.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-185.1,-102.2,370.29999999999995,204.5);


(lib._45 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.CachedBmp_6();
	this.instance.setTransform(-64.9,-60.55,0.3344,0.3344);

	this.instance_1 = new lib.CachedBmp_5();
	this.instance_1.setTransform(41.1,-43.65,0.3344,0.3344);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib._45, new cjs.Rectangle(-64.9,-60.5,131.8,121), null);


(lib.___Camera___ = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_0 = function() {
		this.visible = false;
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2));

	// cameraBoundary
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0)").ss(2,1,1,3,true).p("EAq+AfQMhV7AAAMAAAg+fMBV7AAAg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-641,-361,1282,722);


(lib.Tween2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.clock_ring();
	this.instance.setTransform(1539.4,-104.15,1,1,75.001,0,0,0.1,-0.1);

	this.instance_1 = new lib.clock_ring();
	this.instance_1.setTransform(1063.8,-130.05,1,1,-14.9983);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABAXIgBgtIABgBIAAAvIAAgBg");
	this.shape.setTransform(-1121.275,175.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1121.4,-177.7,2708.3,355.4);


(lib.Tween1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.clock_ring();
	this.instance.setTransform(1506.8,-120.1,1,1,75.001,0,0,0.1,-0.1);

	this.instance_1 = new lib.clock_ring();
	this.instance_1.setTransform(1050.75,-130.05,1,1,-14.9983);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AABAXIgBgtIABgBIAAAvIAAgBg");
	this.shape.setTransform(-1108.225,175.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1108.3,-177.7,2662.6,355.4);


(lib.start_bttn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// weight
	this.instance = new lib.hand_weight();
	this.instance.setTransform(0,-43.75,0.3965,0.3965);

	this.instance_1 = new lib.hand_weightcopy();
	this.instance_1.setTransform(0,-43.75,0.3965,0.3965);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.996)").s().p("Av2HMIAAuXIftAAIAAOXg");
	this.shape.setTransform(0,-43.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance_1}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape}]},1).wait(1));

	// text
	this.instance_2 = new lib.CachedBmp_19();
	this.instance_2.setTransform(-93.45,14.8,0.3276,0.3276);

	this.instance_3 = new lib.CachedBmp_20();
	this.instance_3.setTransform(-93.45,14.8,0.3276,0.3276);

	this.instance_4 = new lib.CachedBmp_21();
	this.instance_4.setTransform(-93.45,14.8,0.3276,0.3276);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2}]}).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_4}]},1).to({state:[]},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-101.5,-89.7,203,178.9);


(lib.Scene_1_white_board = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// white_board
	this.instance = new lib.whiteboard();
	this.instance.setTransform(646.85,484.15);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(105).to({_off:false},0).to({alpha:1},14).to({alpha:0.3594},9).to({alpha:0},5).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_V_Sign = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// V_Sign
	this.instance = new lib.V();
	this.instance.setTransform(680.1,513.75,0.0481,0.0481);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(779).to({_off:false},0).to({scaleX:1.0067,scaleY:1.0067,x:680.05,y:513.7},11,cjs.Ease.get(1)).to({scaleX:0.7446,scaleY:0.7446},6,cjs.Ease.get(-1)).wait(109));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sweat_drop3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sweat_drop3
	this.instance = new lib.sweat();
	this.instance.setTransform(633.15,543.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(799).to({_off:false},0).to({x:634.55,y:550.6},84).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sweat_drop2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sweat_drop2
	this.instance = new lib.sweat();
	this.instance.setTransform(630.25,545.3);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(783).to({_off:false},0).to({regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999,x:630.3,y:554.6},82).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_sweat_drop1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sweat_drop1
	this.instance = new lib.sweat();
	this.instance.setTransform(633.15,543.1);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(768).to({_off:false},0).to({x:634.55,y:550.6},33).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_muscle = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// muscle
	this.instance = new lib.muscle();
	this.instance.setTransform(667.5,522.65,0.008,0.008,0,0,0,18.8,25);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(768).to({_off:false},0).to({regX:16.3,regY:22.7,scaleX:0.0706,scaleY:0.0706},11,cjs.Ease.get(1)).to({regX:16.1,regY:22.1,scaleX:0.0589,scaleY:0.0589},8,cjs.Ease.get(-1)).wait(118));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_leftDoorAnimation = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// leftDoorAnimation
	this.instance = new lib.right_door();
	this.instance.setTransform(619.95,531.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(84).to({_off:false},0).to({x:574.85,y:531.15},24).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_innerDoors = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// innerDoors
	this.instance = new lib.right_door();
	this.instance.setTransform(612.8,530.95);

	this.instance_1 = new lib.right_door();
	this.instance_1.setTransform(658.1,531.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).to({state:[{t:this.instance}]},84).to({state:[{t:this.instance}]},24).wait(12));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(84).to({x:665.25,y:531.45},0).to({x:708.65},24).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_BG = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// BG
	this.instance = new lib.מיטתאימון("synched",0);
	this.instance.setTransform(560.8,512.2,0.2966,0.3028,0,0,0,8.4,11.1);

	this.instance_1 = new lib.BG("synched",0);
	this.instance_1.setTransform(646.2,494.15,0.2966,0.3027,0,0,0,9.1,9.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1},{t:this.instance}]},120).wait(785));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.start_bttn_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// weight
	this.instance_5 = new lib.hand_weight_1();
	this.instance_5.setTransform(-5.25,-37.25,0.3003,0.3003,0,0,0,0,-0.1);

	this.instance_6 = new lib.hand_weightcopy();
	this.instance_6.setTransform(0,-43.75,0.3965,0.3965);
	this.instance_6.alpha = 0.7891;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.996)").s().p("A6GZjMAAAgzFMA0NAAAMAAAAzFg");
	this.shape_1.setTransform(33.3,-10.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5,p:{regY:-0.1,scaleX:0.3003,scaleY:0.3003,x:-5.25,y:-37.25}}]}).to({state:[{t:this.instance_6}]},1).to({state:[{t:this.instance_5,p:{regY:0,scaleX:0.3965,scaleY:0.3965,x:0,y:-43.75}}]},1).to({state:[{t:this.shape_1}]},1).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(10,1,1).p("AZ8ByIpJFQIlRpHIAwgdINJDagAAaVlQiGAZiSAAQpGAAmbmcQmcmcAApGQAApFGcmcQGbmcJGAAQJFAAGcGcQF/F+AcIQ");
	this.shape_2.setTransform(30.65,-0.95);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.996)").s().p("AnMkUIAvgdINJDbIAhA6IpHFPg");
	this.shape_3.setTransform(150.55,13.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_3},{t:this.shape_2}]}).to({state:[]},3).wait(1));

	// text
	this.instance_7 = new lib.CachedBmp_16();
	this.instance_7.setTransform(-95.55,-0.15,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_7).to({_off:true},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-140.3,-174.1,342,327);


(lib.fan = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// sail
	this.instance = new lib.innerFancopy();
	this.instance.setTransform(2.85,-27.1,1,1,0,0,0,3,4.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:0.2,regY:0.1,rotation:27.6923,x:2.4,y:-32.25},0).wait(1).to({rotation:55.3846,x:4.8,y:-31.9},0).wait(1).to({rotation:83.0769,x:6.85,y:-30.4},0).wait(1).to({rotation:110.7692,x:7.95,y:-28.15},0).wait(1).to({rotation:138.4615,x:7.85,y:-25.6},0).wait(1).to({rotation:166.1538,x:6.6,y:-23.45},0).wait(1).to({rotation:193.8462,x:4.45,y:-22.15},0).wait(1).to({rotation:221.5385,x:2,y:-21.9},0).wait(1).to({rotation:249.2308,x:-0.2,y:-22.9},0).wait(1).to({rotation:276.9231,x:-1.85,y:-24.85},0).wait(1).to({rotation:304.6154,x:-2.35,y:-27.25},0).wait(1).to({rotation:332.3077,x:-1.6,y:-29.65},0).wait(1).to({rotation:360,x:0.05,y:-31.5},0).wait(1).to({regX:0,regY:0,x:-0.15,y:-31.6},0).wait(1));

	// post
	this.instance_1 = new lib.CachedBmp_12();
	this.instance_1.setTransform(-24.7,-5.05,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(15));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-66.3,-95.7,139,173.7);


(lib.clock_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// hand
	this.instance = new lib.hand();
	this.instance.setTransform(1.45,25.55,1,1,0,0,0,0.4,20.4);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({rotation:1080},64).wait(1));

	// clock
	this.instance_1 = new lib.innerclock2("synched",0);
	this.instance_1.setTransform(-72.2,-36.35,0.9999,0.9999,-105.0037,0,0,0.1,0);

	this.instance_2 = new lib.innerclock3("synched",0);
	this.instance_2.setTransform(65.1,107.75,1,1,74.9976,0,0,0.1,0.1);

	this.instance_3 = new lib.innerclock2("synched",0);
	this.instance_3.setTransform(-69.75,102.4,0.9999,0.9999,164.9963,0,0,0.1,0);

	this.instance_4 = new lib.innerclock("synched",0);
	this.instance_4.setTransform(77.05,-30);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(3,1,1).p("AAJwUIAACJAuZANIiIAAAQiAWIiIAAAAbOMIAACJ");
	this.shape.setTransform(-0.925,31.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#333333").ss(5,1,1).p("ANSAAQAAFgj5D5Qj5D5lgAAQlfAAj5j5Qj5j5AAlgQAAlfD5j5QD5j5FfAAQFgAAD5D5QD5D5AAFfg");
	this.shape_1.setTransform(-0.55,31.9);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(10,1,1).p("AQxAAQAAG8k6E7Qk7E6m8AAQm8AAk6k6Qk6k7AAm8QAAm8E6k6QE6k6G8AAQG8AAE7E6QE6E6AAG8g");
	this.shape_2.setTransform(-0.4,32.35);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#999999").ss(7,1,1).p("ATjAAQAAIGlvFvQluFuoGAAQoFAAluluQlvlvAAoGQAAnMEjlWQAkgpAogoQAhghAigeQD1jYE2g+QB+gaCHAAQB2AABuATQFGA5EBDeQAlAgAkAlQAlAkAhAnQEpFXAAHRg");
	this.shape_3.setTransform(0.025,31.05);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#666666").ss(3,1,1).p("AjxFDQgKgIgJgKQhshrAAiZQAAiYBshsQBshrCYAAQCZAABrBrQBtBsAACYQAACZhtBrQgGAGgGAG");
	this.shape_4.setTransform(-2,-123.775);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#CCCCCC").s().p("AlgFiQiTiTAAjPQAAjOCTiTQCSiSDOAAQAVAAAUABQC1AOCDCDQCTCTAADOQAADPiTCTQiSCSjPAAQjOAAiSiSgAgchfQgOAOgBATQABAUAOANIADADQANALAPAAIAGAAIABAAQAQgCALgMQAOgNAAgUQAAgRgLgNIgDgDQgJgKgNgDIgFgBIgHAAQgRAAgOAOg");
	this.shape_5.setTransform(0.4,31.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ar2L2Qk6k6AAm8QAAm7E6k7QE7k6G7AAQG8AAE6E6QE7E7AAG7QAAG8k7E6Qk6E7m8AAQm7AAk7k7gAAWQRIAAiJgAtTgEQABFgD4D4QD6D6FgAAQFeAAD6j6QD4j4AAlgQAAlgj4j4Qj6j6leAAQlgAAj6D6Qj4D4gBFgIAAAAgAQdASIiIAAgAueAJIiIAAgAAEuPIAAiJgApaJUQj4j4gBlgQABlgD4j4QD6j6FgAAQFeAAD6D6QD4D4AAFgQAAFgj4D4Qj6D6leAAQlgAAj6j6gAlYloQiTCTAADOQAADOCTCTQCSCTDOAAQDPAACSiTQCTiTAAjOQAAjOiTiTQiDiEi1gNQgUgBgVAAQjOgBiSCTgANQgEIAAAAg");
	this.shape_6.setTransform(-0.4,32.35);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#999999").s().p("AtzN1QlvlvAAoGQAAnMEjlWQAkgpAogpQAhggAhgeQD2jYE2g+QB+gZCHAAQB2gBBuAUQFGA4EBDeQAlAgAkAkQAlAlAhAnQEpFXAAHRQAAIGlvFvQluFtoGAAQoFAAlultgAr6rpQk6E7AAG7QAAG8E6E6QE6E7G9AAQG7AAE6k7QE7k6AAm8QAAm7k7k7Qk6k6m7AAQm9AAk6E6g");
	this.shape_7.setTransform(0.025,31.05);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#666666").s().p("Aw3EmICOiRIB/CDQgiAdghAhQgoAogkAqgAN7FWQglgkglggIB5h9ICOCRIh3B7QgigmgkglgAiignIAAhvIBlAAIAAiAIhdAAIAAgCQAAg7ApgqQAqgqA7AAQA7AAAqAqQApAqAAA7IAAACIhcAAIAACAIBuAAIAABvg");
	this.shape_8.setTransform(-0.6,-91.625);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1}]}).wait(65));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-128.5,-157.6,257.1,317.2);


(lib.carWheel = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol1();
	this.instance.setTransform(0,0,1,1,0,0,0,39,39.5);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(5,1,1).p("AgEBiIAEhoIAFhb");
	this.shape.setTransform(1.525,-12.75);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(1,1,1).p("ACMAAQAAA6gpApQgpApg6AAQg5AAgpgpQgpgpAAg6QAAg5ApgpQApgpA5AAQADAAACAAQA2ACAoAnQApApAAA5g");
	this.shape_1.setTransform(1.05,0.55);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#404040").s().p("AgCACQgCgCAAgEIAJAAIAAAJQgFAAgCgDg");
	this.shape_2.setTransform(-21.5,6);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#B4B4B4").s().p("AgEAFIAAgJQAEAAADADQACABAAAFIgJAAg");
	this.shape_3.setTransform(-21.5,4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#828282").s().p("AgBADQgDgDAAgEQAEAAACACQADACAAAFQgFAAgBgCg");
	this.shape_4.setTransform(-9.5,20);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#666666").s().p("AgBACQgDgCAAgEIAJAAIAAAJQgFAAgBgDg");
	this.shape_5.setTransform(-7.5,21);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#A5A5A5").s().p("AgEAFIAAgJQAEAAADADQACABAAAFIgJAAg");
	this.shape_6.setTransform(-6.5,21);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#5E5E5E").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_7.setTransform(-15.5,16);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#A6A6A6").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_8.setTransform(-17.5,13);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#575757").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_9.setTransform(-14.5,17);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#7A7A7A").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_10.setTransform(-18.5,12);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#8C8C8C").s().p("AgCADQgCgDAAgEQAEAAACACQADACAAAFQgFAAgCgCg");
	this.shape_11.setTransform(-20.5,8);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#A4A4A4").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_12.setTransform(-19.5,-10);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#414141").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_13.setTransform(-19.5,-11);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#C4C4C4").s().p("AgEgEIAJAAQAAAEgDACQgCADgEAAIAAgJg");
	this.shape_14.setTransform(-17.5,-13);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#646464").s().p("AgEgEIAJAAQAAAEgDACQgCADgEAAIAAgJg");
	this.shape_15.setTransform(-16.5,-15);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#737373").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_16.setTransform(-11.5,-19);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#B8B8B8").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_17.setTransform(-6.5,-21);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#7D7D7D").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_18.setTransform(-7.5,-21);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#9A9A9A").s().p("AgEgEIAJAAQAAAEgDADQgCACgEAAIAAgJg");
	this.shape_19.setTransform(-9.5,-20);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#BCBCBC").s().p("AhAAPIAKAAQAAAFgCADQgDACgFAAIAAgKgAAjgYIAUAAIAKAAQAAAFgCAAQgNAFgPAAIAAgKg");
	this.shape_20.setTransform(-6.5,-20);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#4A4A4A").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_21.setTransform(-4.5,-22);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#7F7F7F").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_22.setTransform(-3.5,-22);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#CDCDCD").s().p("AgFAPIAAgKIAAgTIAJAAIABAJQAFAUgNAAIgCAAg");
	this.shape_23.setTransform(-21.3812,-2.9952);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#979797").s().p("AAlCFQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCgAgfA1QgDgDAAgFQAFAAACACQADADAAAFQgFAAgCgCgAgsiGIAKAAQAAAFgDADQgCACgFAAIAAgKg");
	this.shape_24.setTransform(-16.5,5);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#636363").s().p("AgEgEIAJAAQAAAEgCADQgDACgEAAIAAgJg");
	this.shape_25.setTransform(13.5,18);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#989898").s().p("AgEgEIAJAAQAAAEgCADQgDACgEAAIAAgJg");
	this.shape_26.setTransform(14.5,17);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#909090").s().p("AgEgEIAJAAQAAAEgDACQgCADgEAAIAAgJg");
	this.shape_27.setTransform(17.5,14);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#505050").s().p("AgEgEIAJAAQAAAEgDACQgCADgEAAIAAgJg");
	this.shape_28.setTransform(18.5,13);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#C6C6C6").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_29.setTransform(6.5,21);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#AFAFAF").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_30.setTransform(9.5,20);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#5C5C5C").s().p("ABkC5IAKAAQAAAFgCACQgDADgFAAIAAgKgAhqB6QgDgCAAgFQAFAAACADQADACAAAFQgFAAgCgDgAhjjCIAKAAQAAAFgCACQgDADgFAAIAAgKg");
	this.shape_31.setTransform(-6,3);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#AAAAAA").s().p("AgiAjIg8AAIAAgKIA8AAIAKAAIAAAKIgKAAgABVgiIAKAAQAAAFgCADQgDACgFAAIAAgKg");
	this.shape_32.setTransform(6.5,19);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#9F9F9F").s().p("AhAAtIAKAAQAAAFgDACQgCADgFAAIAAgKgAAZgOIAKAAQAAAFgDACQgCADgFAAIAAgKgAA3g2IAKAAQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_33.setTransform(13.5,16);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#959595").s().p("AC+BkIAKAAQAAAFgCADQgDACgFAAIAAgKgAjHhtIAKAAQAAAFgDACQgCADgFAAIAAgKg");
	this.shape_34.setTransform(1,-1.5);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#606060").s().p("AgEgEIAJAAQAAAEgCADQgDACgEAAIAAgJg");
	this.shape_35.setTransform(21.5,7);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#525252").s().p("AgEgEIAJAAQAAAEgCACQgDADgEAAIAAgJg");
	this.shape_36.setTransform(22.5,3);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#7C7C7C").s().p("AgEAZIAAgKIAAgnIAJAAIAAAnIAAAKIgJAAg");
	this.shape_37.setTransform(22.5,0);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#4D4D4D").s().p("AA8C0IAKAAQAAAFgDADQgCACgFAAIAAgKgAC0gnIAAgKIAAgKQAFAFADAGQACAEAAAFIgKAAgAi9i9IAKAAQAAAFgCADQgDACgFAAIAAgKg");
	this.shape_38.setTransform(4,1.5);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#B9B9B9").s().p("AgCACQgCgCAAgEIAJAAIAAAJQgFAAgCgDg");
	this.shape_39.setTransform(21.5,-6);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#717171").s().p("AhXCTQgCgCAAgFIAKAAIAAAKQgFAAgDgDgAinB2QgCgDAAgFQAFAAACACQADADAAAFQgFAAgDgCgACgiLIAAgKQAFAAADACQACADAAAFIgKAAg");
	this.shape_40.setTransform(5,7.5);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#9E9E9E").s().p("AADANQgDgDAAgFQAFAAADACQACADAAAFQgFAAgCgCgAgGgGQgDgDAAgFQAFAAACACQACADAAAFQgEAAgCgCg");
	this.shape_41.setTransform(20,-10);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AhiBjQgogqAAg5QAAg4AogpQApgpA5gBIAFAAQA2ACAnAoQAqApAAA4QAAA5gqAqQgpApg5gBQg5ABgpgpgAAAgiIAFhpg");
	this.shape_42.setTransform(1.05,0.55);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#B6B6B6").s().p("ABaCRIAAgKIAKAAIAAAKIgKAAgAhhiJQgCgCAAgFIAKAAIAAAKQgFAAgDgDg");
	this.shape_43.setTransform(12,-8);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#939393").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_44.setTransform(3.5,-22);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#6E6E6E").s().p("AgEAFIAAgJIAJAAIAAAJIgJAAg");
	this.shape_45.setTransform(4.5,-22);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#474747").s().p("Ah3AtIAAgKIAKAAIAAAKIgKAAgABugiIAAgKQAFAAADADQACACAAAFIgKAAg");
	this.shape_46.setTransform(-6,-18);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#ACACAC").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_47.setTransform(7.5,-21);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#676767").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_48.setTransform(18.5,-13);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#A7A7A7").s().p("AgdClIAKAAQAAAFgCADQgDACgFAAIAAgKgAAXinQgDgCAAgFQAFAAACADQADACAAAFQgFAAgCgDg");
	this.shape_49.setTransform(14,2);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#8E8E8E").s().p("AgBACQgDgCAAgEQAEAAACADQADABAAAFQgFAAgBgDg");
	this.shape_50.setTransform(17.5,-14);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#BBBBBB").s().p("AgCACQgCgCAAgEQAEAAADACQACACAAAFQgFAAgCgDg");
	this.shape_51.setTransform(15.5,-16);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#969696").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_52.setTransform(14.5,-17);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("#838383").s().p("AizB4IAAgKIAKAAIAAAKIgKAAgAizAUIAAgKIAKAAIAAAKIgKAAgACshvQgCgDAAgFQAFAAADACQACADAAAFQgFAAgDgCg");
	this.shape_53.setTransform(-4,-6.5);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("#C3C3C3").s().p("AgCADQgCgDAAgEQAEAAADACQACACAAAFQgFAAgCgCg");
	this.shape_54.setTransform(11.5,-19);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#FDFDFD").s().p("AAyDcIgKAAIgKAAIg7AAIgKAAIgKAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAQAAgFgDgDQgCgCgFAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgCgDQgDgCgFAAQAAgFgCgCQgDgDgFAAQAAgFgDgCQgCgDgFAAIAAgKQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKIAAgKIAAgKQAAgFgCgCQgDgDgFAAIAAgKIAAgnQAQABgFgVIgBgKIAAgKIAAgKIAAgKQAFAAACgCQADgDAAgFIAAgKQAFAAACgCQADgDAAgFIAAgKQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFIAAgKQAFAAACgDQADgCAAgFQAFAAADgDQACgCAAgFQAFAAADgCQACgDAAgFIAKAAQAFAAADgCQACgDAAgFQAFAAACgCQADgDAAgFIAKAAQAFAAACgCQADgDAAgFIAKAAIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAIAKAAQAPAAANgFQABAAAAgFIAKAAIAKAAQAAAFADACQACADAFAAIAKAAIAKAAIAKAAIAKAAQAAAFADACQACADAFAAIAKAAIAKAAQAAAFADADQACACAFAAQAAAFADADQACACAFAAIAKAAQAAAFACADQADACAFAAQAAAFACADQADACAFAAQAAAFACACQADADAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAQAAAFADACQACADAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAIAAAKIAAAKQAAAFACACQADADAFAAIAAAKIAAAKIAAAKIAAAnIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAgAhXhXQgpApAAA4QAAA6ApApQApApA5AAQA5AAApgpQApgpAAg6QAAg4gpgpQgngng3gCIAFhbIgFBbIgEAAQg5AAgpApg");
	this.shape_55.setTransform(0,-0.5);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#656565").s().p("AgBADQgDgDAAgEQAEAAACACQADACAAAFQgFAAgBgCg");
	this.shape_56.setTransform(10.5,-20);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#030303").s().p("AAUGLIgxAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAIgKAAIgKAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAIgKAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgDgDQgCgCgFAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAQAAgFgCgCQgDgDgFAAQAAgFgCgCQgDgDgFAAIgKAAQAAgFgCgCQgDgDgFAAQAAgFgDgCQgCgDgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgDgDQgCgCgFAAQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgCQgDgDgFAAQAAgFgCgCQgDgDgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgCQgCgDgFAAIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgKQAAgFgDgDQgCgCgFAAIAAgKIAAgKIAAgKIAAgKQAAgFgDgCQgCgDgFAAIAAgKIAAgUIAAgKIAAgnIAAgKIAAgKQAFgFADgGQACgEAAgFIAAgKIAAgKIAAgKIAAgKQAFAAACgCQADgDAAgFIAAgKIAAgKQAFAAACgDQADgCAAgFIAAgKQAFAAACgDQADgCAAgFIAAgKQAFAAACgCQADgDAAgFIAAgKIAAgKQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAAgKQAFAAADgDQACgCAAgFQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAACgCQADgDAAgFQAFAAACgDQADgCAAgFQAFAAADgDQACgCAAgFIAKAAQAFAAADgDQACgCAAgFQAFAAADgDQACgCAAgFIAKAAQAFAAACgDQADgCAAgFIAKAAQAFAAACgCQADgDAAgFIAKAAQAFAAADgCQACgDAAgFIAKAAQAFAAADgCQACgDAAgFIAKAAIAKAAIAKAAQAFAAACgCQADgDAAgFIAKAAIAKAAIAKAAIAKAAQAKAAAIgEQACgBAAgFIA7AAIAKAAQAAAFACACQADADAFAAIAKAAIAKAAIAKAAIAKAAIAKAAQAAAFADADQACACAFAAIAKAAIAKAAQAAAFACADQADACAFAAIAKAAIAKAAQAAAFADADQACACAFAAIAKAAQAAAFADADQACACAFAAIAKAAQAAAFADACQACADAFAAQAAAFACACQADADAFAAIAKAAQAAAFACACQADADAFAAQAAAFACACQADADAFAAQAAAFADACQACADAFAAQAAAFADADQACACAFAAIAKAAQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAQAAAFACACQADADAFAAQAAAFACACQADADAFAAQAAAFACACQADADAFAAIAAAKQAAAFACACQADADAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADACQACADAFAAIAAAKQAAAFADACQACADAFAAIAAAKIAAAKIAAAKQAAAFADADQACACAFAAIAAAKIAAAKIAAAKIAAAKIAAAUIAAAKIAAAnIAAAKIAAAKIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIgKAAIAAAKIgKAAgAjbgsIAAAUIAAAKIAAAnIAAAKIAAAKIAAAKQAAAFACACQADADAFAAIAAAKQAAAFACADQADACAFAAIAAAKQAAAFADADQACACAFAAIAAAKQAAAFADACQACADAFAAQAAAFADACQACADAFAAIAAAKQAAAFADACQACADAFAAQAAAFACADQADACAFAAQAAAFACADQADACAFAAIAKAAQAAAFACADQADACAFAAQAAAFACADQADACAFAAIAKAAQAAAFADADQACACAFAAIAKAAQAAAFADACQACADAFAAIAKAAIAKAAIAKAAQAAAFACACQADADAFAAIA7AAIAKAAQAFAAADgDQACgCAAgFIAKAAIAKAAQAFAAACgDQADgCAAgFIAKAAIAKAAQAFAAACgCQADgDAAgFQAFAAADgCQACgDAAgFIAKAAQAFAAADgCQACgDAAgFQAFAAADgCQACgDAAgFQAFAAADgCQACgDAAgFQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFQAFAAACgDQADgCAAgFIAAgKQAFAAACgCQADgDAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKQAFAAADgCQACgDAAgFIAAgKIAAgKIAAgKQAFAAADgDQACgCAAgFIAAgKIAAgnQAAgFgCgEQgDgGgFgFIAAgKIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgCgDQgDgCgFAAIAAgKQAAgFgDgDQgCgCgFAAIAAgKQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAQAAgFgDgCQgCgDgFAAQAAgFgCgDQgDgCgFAAQAAgFgCgDQgDgCgFAAQAAgFgCgDQgDgCgFAAIgKAAQAAgFgCgDQgDgCgFAAQAAgFgDgDQgCgCgFAAIgKAAIgKAAQAAgFgDgCQgCgDgFAAIgKAAQAAgFgCgCQgDgDgFAAIgKAAIgKAAIgKAAIgKAAIgKAAIgJAAIgUAAIgKAAIgKAAIAAAKIgKAAIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIgKAAIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKIAAAKIAAAKIgKAAIAAAKg");

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.shape_57},{t:this.shape_56},{t:this.shape_55},{t:this.shape_54},{t:this.shape_53},{t:this.shape_52},{t:this.shape_51},{t:this.shape_50},{t:this.shape_49},{t:this.shape_48},{t:this.shape_47},{t:this.shape_46},{t:this.shape_45},{t:this.shape_44},{t:this.shape_43},{t:this.shape_42},{t:this.shape_41},{t:this.shape_40},{t:this.shape_39},{t:this.shape_38},{t:this.shape_37},{t:this.shape_36},{t:this.shape_35},{t:this.shape_34},{t:this.shape_33},{t:this.shape_32},{t:this.shape_31},{t:this.shape_30},{t:this.shape_29},{t:this.shape_28},{t:this.shape_27},{t:this.shape_26},{t:this.shape_25},{t:this.shape_24},{t:this.shape_23},{t:this.shape_22},{t:this.shape_21},{t:this.shape_20},{t:this.shape_19},{t:this.shape_18},{t:this.shape_17},{t:this.shape_16},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({rotation:45,y:0.05},0).wait(1).to({rotation:90,y:0},0).wait(1).to({rotation:135,x:-0.05},0).wait(1).to({rotation:180,x:0},0).wait(1).to({rotation:225,y:-0.05},0).wait(1).to({rotation:270,y:0},0).wait(1).to({rotation:315,x:0.05},0).wait(1).to({rotation:360,x:0},0).to({_off:true},1).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-40,-40,80,80);


(lib.Bird_Body = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// wings
	this.instance = new lib.CloseWings();
	this.instance.setTransform(63.2,-87.95,1,1,0,0,0,51.1,0);

	this.instance_1 = new lib.OpenWings();
	this.instance_1.setTransform(-28.95,-52);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance}]}).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance}]},1).to({state:[{t:this.instance_1}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({regX:51,x:63.1},0).wait(9).to({_off:true},1).wait(1));

	// body
	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-134.2,-92.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(12));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-245.3,-208.5,433,301);


(lib.Scene_1_fan = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// fan
	this.instance = new lib.fan();
	this.instance.setTransform(482.45,541.1,0.4951,0.4951,0,0,0,0.5,0.6);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(119).to({_off:false},0).wait(786));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_button = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// button
	this.start_btn = new lib.start_bttn();
	this.start_btn.name = "start_btn";
	this.start_btn.setTransform(653.5,419.1,1.5261,1.5261,0,0,0,0.1,0.1);
	new cjs.ButtonHelper(this.start_btn, 0, 1, 2, false, new lib.start_bttn(), 3);

	this.startAgain_btn = new lib.start_bttn_1();
	this.startAgain_btn.name = "startAgain_btn";
	this.startAgain_btn.setTransform(768.9,503.55,0.122,0.122,0,0,0,2,2);
	this.startAgain_btn.alpha = 0;
	this.startAgain_btn._off = true;
	new cjs.ButtonHelper(this.startAgain_btn, 0, 1, 2, false, new lib.start_bttn_1(), 3);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.start_btn}]}).to({state:[]},2).to({state:[{t:this.startAgain_btn}]},863).to({state:[{t:this.startAgain_btn}]},39).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.startAgain_btn).wait(865).to({_off:false},0).to({alpha:1},39).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_bird = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// bird
	this.instance = new lib.Bird_Body();
	this.instance.setTransform(940.7,237,0.2621,0.2621,0,0,0,0.2,0.2);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).wait(1).to({regX:-28.8,regY:-58,scaleX:0.264,scaleY:0.264,x:922.55,y:214.95},0).wait(1).to({scaleX:0.266,scaleY:0.266,x:912.05,y:208.15},0).wait(1).to({scaleX:0.2679,scaleY:0.2679,x:901.55,y:201.4},0).wait(1).to({scaleX:0.2698,scaleY:0.2698,x:891.05,y:194.6},0).wait(1).to({scaleX:0.2718,scaleY:0.2718,x:880.5,y:187.85},0).wait(1).to({scaleX:0.2737,scaleY:0.2737,x:870,y:181.1},0).wait(1).to({scaleX:0.2756,scaleY:0.2756,x:859.5,y:174.25},0).wait(1).to({scaleX:0.2775,scaleY:0.2775,x:849,y:167.5},0).wait(1).to({scaleX:0.2795,scaleY:0.2795,x:838.5,y:160.75},0).wait(1).to({scaleX:0.2814,scaleY:0.2814,x:828,y:153.95},0).wait(1).to({scaleX:0.2833,scaleY:0.2833,x:818.9,y:152.75},0).wait(1).to({scaleX:0.2852,scaleY:0.2852,x:809.75,y:151.55},0).wait(1).to({scaleX:0.2872,scaleY:0.2872,x:800.6,y:150.35},0).wait(1).to({scaleX:0.2891,scaleY:0.2891,x:791.4,y:149.2},0).wait(1).to({scaleX:0.291,scaleY:0.291,x:782.25,y:147.95},0).wait(1).to({scaleX:0.293,scaleY:0.293,x:773.15,y:146.75},0).wait(1).to({scaleX:0.2949,scaleY:0.2949,x:764,y:145.6},0).wait(1).to({scaleX:0.2968,scaleY:0.2968,x:754.85,y:144.4},0).wait(1).to({scaleX:0.2987,scaleY:0.2987,x:745.7,y:143.15},0).wait(1).to({scaleX:0.3007,scaleY:0.3007,x:736.6,y:142},0).wait(1).to({scaleX:0.3026,scaleY:0.3026,x:727.45,y:140.8},0).wait(1).to({scaleX:0.3045,scaleY:0.3045,x:718.3,y:139.6},0).wait(1).to({scaleX:0.3064,scaleY:0.3064,x:709.1,y:138.45},0).wait(1).to({scaleX:0.3084,scaleY:0.3084,x:699.95,y:137.2},0).wait(1).to({scaleX:0.3103,scaleY:0.3103,x:690.85,y:136},0).wait(1).to({scaleX:0.3122,scaleY:0.3122,x:681.7,y:134.85},0).wait(1).to({scaleX:0.3142,scaleY:0.3142,x:672.55,y:133.65},0).wait(1).to({scaleX:0.3161,scaleY:0.3161,x:663.4,y:132.4},0).wait(1).to({x:655.4,y:133.65},0).wait(1).to({x:647.4,y:134.95},0).wait(1).to({x:639.4,y:136.2},0).wait(1).to({x:631.35,y:137.45},0).wait(1).to({x:623.35,y:138.7},0).wait(1).to({x:615.35,y:139.95},0).wait(1).to({x:607.35,y:141.2},0).wait(1).to({x:599.3,y:142.5},0).wait(1).to({x:591.3,y:143.75},0).wait(1).to({x:583.3,y:145},0).wait(1).to({x:575.3,y:146.25},0).wait(1).to({x:567.25,y:147.5},0).wait(1).to({x:559.25,y:148.75},0).wait(1).to({x:551.25,y:150.05},0).wait(1).to({x:543.25,y:151.3},0).wait(1).to({x:535.25,y:152.55},0).wait(1).to({x:527.2,y:153.8},0).wait(1).to({x:519.2,y:155.05},0).wait(1).to({x:511.2,y:156.3},0).wait(1).to({x:503.2,y:157.6},0).wait(1).to({x:495.15,y:158.85},0).wait(1).to({x:487.15,y:160.1},0).wait(1).to({x:479.15,y:161.35},0).wait(1).to({x:471.15,y:162.6},0).wait(1).to({x:463.1,y:163.85},0).wait(1).to({x:455.1,y:165.15},0).wait(1).to({x:447.1,y:166.4},0).wait(1).to({x:439.1,y:167.65},0).wait(1).to({x:431.1,y:168.9},0).wait(1).to({x:423.05,y:170.15},0).wait(61));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.men = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// angle
	this.instance = new lib._45();
	this.instance.setTransform(1106.1,217.4,0.05,0.05,0,0,0,2,0);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(238).to({_off:false},0).to({regX:1.1,scaleX:1.4951,scaleY:1.4951,x:1106.3},7,cjs.Ease.get(1)).to({regX:1,scaleX:1,scaleY:1,x:1106.1},4,cjs.Ease.get(-1)).wait(51).to({alpha:0},8).to({_off:true},1).wait(331));

	// Layer_2
	this.instance_1 = new lib.Tween1("synched",0);
	this.instance_1.setTransform(-906.85,-108.65);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween2("synched",0);
	this.instance_2.setTransform(-922.55,-131.05);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(573).to({_off:false},0).to({_off:true,x:-922.55,y:-131.05},17).wait(50));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(573).to({_off:false},17).to({y:-86.25},9).to({x:-934.05,y:-125.45},12).to({alpha:0},9).wait(20));

	// clock
	this.instance_3 = new lib.clock_1("single",0);
	this.instance_3.setTransform(1244.35,-248.9,0.8908,0.8908);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(410).to({startPosition:0},0).to({scaleX:1.7486,scaleY:1.7486,x:366.6,y:-57.75},90,cjs.Ease.quadInOut).wait(6).to({mode:"synched",loop:false},0).wait(67).to({startPosition:64},0).to({scaleX:1.7485,scaleY:1.7485,rotation:3.7046},4).to({scaleY:1.7486,rotation:-0.013},4).to({regX:0.1,regY:-0.1,scaleY:1.7485,rotation:-3.4501,x:366.75,y:-57.9},4).to({scaleY:1.7486,rotation:0.2405},4).to({regY:-0.2,scaleY:1.7485,rotation:7.4551,y:-58.1},4).to({rotation:0.0135,y:-58.05},4).to({rotation:-4.9819},4).to({scaleX:1.7484,rotation:1.0176,y:-58.1},4).wait(15).to({regX:0,regY:0,scaleX:1.7486,scaleY:1.7486,rotation:0,x:366.6,y:14.05,mode:"single"},0).to({scaleX:0.8908,scaleY:0.8908,x:1244.35,y:-248.9,startPosition:0},19,cjs.Ease.quadInOut).wait(1));

	// line2_legs
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(9,1,1).p("AgpgvIBTBf");
	this.shape.setTransform(812.475,405.05);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#000000").ss(9,1,1).p("AjVj1IGrHr");
	this.shape_1.setTransform(829.65,424.925);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#000000").ss(9,1,1).p("AlqmhILVNE");
	this.shape_2.setTransform(844.525,442.15);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#000000").ss(9,1,1).p("AnoozIPRRn");
	this.shape_3.setTransform(857.1,456.725);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#000000").ss(9,1,1).p("ApPqqISfVW");
	this.shape_4.setTransform(867.425,468.65);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#000000").ss(9,1,1).p("AqfsHIU/YP");
	this.shape_5.setTransform(875.425,477.925);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#000000").ss(9,1,1).p("ArYtJIWxaU");
	this.shape_6.setTransform(881.15,484.55);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#000000").ss(9,1,1).p("Ar6txIX1bj");
	this.shape_7.setTransform(884.575,488.525);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#000000").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_8.setTransform(885.725,489.85);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("rgba(0,0,0,0.898)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_9.setTransform(885.725,489.85);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("rgba(0,0,0,0.8)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_10.setTransform(885.725,489.85);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("rgba(0,0,0,0.698)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_11.setTransform(885.725,489.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("rgba(0,0,0,0.6)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_12.setTransform(885.725,489.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("rgba(0,0,0,0.502)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_13.setTransform(885.725,489.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("rgba(0,0,0,0.4)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_14.setTransform(885.725,489.85);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("rgba(0,0,0,0.302)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_15.setTransform(885.725,489.85);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("rgba(0,0,0,0.2)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_16.setTransform(885.725,489.85);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("rgba(0,0,0,0.102)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_17.setTransform(885.725,489.85);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("rgba(0,0,0,0)").ss(9,1,1).p("AsGt/IYNb+");
	this.shape_18.setTransform(885.725,489.85);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape}]},124).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_8}]},44).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).wait(454));

	// line1_leg
	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#000000").ss(9,1,1).p("AghA2IBDhr");
	this.shape_19.setTransform(703.325,567.65);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#000000").ss(9,1,1).p("AiYD0IExnn");
	this.shape_20.setTransform(715.225,548.675);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#000000").ss(9,1,1).p("Aj/GYIH/sv");
	this.shape_21.setTransform(725.55,532.225);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#000000").ss(9,1,1).p("AlWIkIKtxG");
	this.shape_22.setTransform(734.275,518.3);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#000000").ss(9,1,1).p("AmeKVIM80p");
	this.shape_23.setTransform(741.4,506.925);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#000000").ss(9,1,1).p("AnVLuIOr3b");
	this.shape_24.setTransform(746.95,498.05);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#000000").ss(9,1,1).p("An9MtIP75Z");
	this.shape_25.setTransform(750.925,491.725);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#000000").ss(9,1,1).p("AoUNTIQq6l");
	this.shape_26.setTransform(753.3,487.95);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#000000").ss(9,1,1).p("AocNgIQ56/");
	this.shape_27.setTransform(754.1,486.675);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("rgba(0,0,0,0.898)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_28.setTransform(754.1,486.675);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("rgba(0,0,0,0.8)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_29.setTransform(754.1,486.675);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("rgba(0,0,0,0.698)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_30.setTransform(754.1,486.675);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("rgba(0,0,0,0.6)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_31.setTransform(754.1,486.675);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("rgba(0,0,0,0.502)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_32.setTransform(754.1,486.675);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("rgba(0,0,0,0.4)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_33.setTransform(754.1,486.675);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("rgba(0,0,0,0.302)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_34.setTransform(754.1,486.675);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("rgba(0,0,0,0.2)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_35.setTransform(754.1,486.675);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("rgba(0,0,0,0.102)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_36.setTransform(754.1,486.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("rgba(0,0,0,0)").ss(9,1,1).p("AocNgIQ56/");
	this.shape_37.setTransform(754.1,486.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_19}]},108).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_27}]},60).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).wait(454));

	// circle3_leg
	this.instance_4 = new lib.legsanimation();
	this.instance_4.setTransform(963.25,579.4,0.047,0.0467,0,0,0,1.1,0);
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(132).to({_off:false},0).to({regX:0,scaleX:1,scaleY:1},8,cjs.Ease.get(1)).wait(36).to({alpha:0},10).wait(454));

	// circle2_leg
	this.instance_5 = new lib.legsanimation();
	this.instance_5.setTransform(808.3,400.3,0.047,0.0467,0,0,0,0,1.1);
	this.instance_5._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(116).to({_off:false},0).to({regY:0,scaleX:1,scaleY:1},8,cjs.Ease.get(1)).wait(52).to({alpha:0},10).wait(454));

	// circle1_leg
	this.instance_6 = new lib.legsanimation();
	this.instance_6.setTransform(700,573.05,0.047,0.0467);
	this.instance_6._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_6).wait(99).to({_off:false},0).to({scaleX:1,scaleY:1},8,cjs.Ease.get(1)).wait(69).to({alpha:0},10).wait(454));

	// arrows_animation
	this.instance_7 = new lib.directionarrow("synched",0);
	this.instance_7.setTransform(301.65,486.95,0.177,0.177,139.5406,0,0,0.4,-0.5);
	this.instance_7.alpha = 0;
	this.instance_7._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(187).to({_off:false},0).to({alpha:1},9).wait(14).to({startPosition:0},0).to({x:379.05,y:422.65},65,cjs.Ease.sineInOut).to({alpha:0},9).wait(20).to({regY:-0.1,rotation:-31.7421,x:435.95,y:381.7,alpha:1},0).to({rotation:-31.7421,x:327.5,y:466.5},83,cjs.Ease.sineInOut).to({alpha:0},12).wait(241));

	// legs_outline
	this.instance_8 = new lib.legscopy("synched",0);
	this.instance_8.setTransform(866.75,519.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_8).wait(304).to({startPosition:0},0).wait(202).to({startPosition:0},0).wait(50).to({startPosition:0},0).wait(84));

	// chest
	this.instance_9 = new lib.BODY("synched",0);
	this.instance_9.setTransform(581.35,595.15,1,1,0,0,0,72,75.6);

	this.timeline.addTween(cjs.Tween.get(this.instance_9).wait(211).to({startPosition:0},0).to({regY:75.5,rotation:14.9983,x:593.9,y:596.45},64,cjs.Ease.sineInOut).wait(29).to({startPosition:0},0).to({regY:75.6,rotation:0,x:581.35,y:595.15},83,cjs.Ease.sineInOut).wait(119).to({startPosition:0},0).to({regY:75.5,rotation:14.9983,x:593.9,y:596.45},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.6,rotation:0,x:581.35,y:595.15},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.5,rotation:14.9983,x:593.9,y:596.45},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.6,rotation:0,x:581.35,y:595.15},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.5,rotation:14.9983,x:593.9,y:596.45},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.6,rotation:0,x:581.35,y:595.15},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.5,rotation:14.9983,x:593.9,y:596.45},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regY:75.6,rotation:0,x:581.35,y:595.15},6,cjs.Ease.sineInOut).wait(68));

	// legs
	this.instance_10 = new lib.legs("synched",0);
	this.instance_10.setTransform(866.75,519.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(304).to({startPosition:0},0).wait(336));

	// backHand
	this.instance_11 = new lib.backHand("synched",0);
	this.instance_11.setTransform(514.75,470.75);

	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(211).to({regX:-145.5,regY:104,x:369.25,y:574.75},0).to({regX:-145.4,rotation:11.961,x:393.85,y:528.1},64,cjs.Ease.sineInOut).wait(29).to({startPosition:0},0).to({regX:-145.5,rotation:0,x:369.25,y:574.75},83,cjs.Ease.sineInOut).wait(119).to({startPosition:0},0).to({regX:-145.4,rotation:11.961,x:393.85,y:528.1},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.5,rotation:0,x:369.25,y:574.75},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.4,rotation:11.961,x:393.85,y:528.1},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.5,rotation:0,x:369.25,y:574.75},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.4,rotation:11.961,x:393.85,y:528.1},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.5,rotation:0,x:369.25,y:574.75},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.4,rotation:11.961,x:393.85,y:528.1},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:-145.5,rotation:0,x:369.25,y:574.75},6,cjs.Ease.sineInOut).wait(68));

	// head
	this.instance_12 = new lib.ראש("synched",0);
	this.instance_12.setTransform(286.15,587.95,1,1,0,0,0,48.6,28.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(211).to({startPosition:0},0).to({regX:48.8,rotation:24.6989,x:320.1,y:515.2},64,cjs.Ease.sineInOut).wait(29).to({startPosition:0},0).to({regX:48.6,rotation:0,x:286.15,y:587.95},83,cjs.Ease.sineInOut).wait(119).to({startPosition:0},0).to({regX:48.8,rotation:24.6989,x:320.1,y:515.2},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.6,rotation:0,x:286.15,y:587.95},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.8,rotation:24.6989,x:320.1,y:515.2},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.6,rotation:0,x:286.15,y:587.95},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.8,rotation:24.6989,x:320.1,y:515.2},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.6,rotation:0,x:286.15,y:587.95},6,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.8,rotation:24.6989,x:320.1,y:515.2},8,cjs.Ease.sineInOut).wait(2).to({startPosition:0},0).to({regX:48.6,rotation:0,x:286.15,y:587.95},6,cjs.Ease.sineInOut).wait(68));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2055.4,-389.2,3414.3,1076.9);


(lib.car = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.carWheel();
	this.instance.setTransform(95,66);

	this.instance_1 = new lib.carWheel();
	this.instance_1.setTransform(-95,67);

	this.instance_2 = new lib.CachedBmp_11();
	this.instance_2.setTransform(-167,-106.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.car, new cjs.Rectangle(-167,-106.5,334,213), null);


(lib.Scene_1_men = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// men
	this.instance = new lib.men("synched",0,false);
	this.instance.setTransform(604.9,464.7,0.1593,0.1626,0,0,0,14.5,14.8);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(120).to({_off:false},0).wait(785));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


(lib.Scene_1_car = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// car
	this.instance = new lib.car();
	this.instance.setTransform(593.45,597.45,0.3587,0.3587);
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1).to({_off:false},0).to({regX:3.6,regY:3.6,scaleX:0.3805,scaleY:0.3805,x:186.95,y:598.85},118).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();


// stage content:
(lib.gym = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,2,133,319,432,542,691,770,865,904];
	this.streamSoundSymbolsList[1] = [{id:"music",startFrame:1,endFrame:905,loop:1,offset:0}];
	this.streamSoundSymbolsList[770] = [{id:"part5",startFrame:770,endFrame:905,loop:1,offset:0}];
	this.___GetDepth___ = function(obj) {
		var depth = obj.depth;
		var cameraObj = this.___camera___instance;
		if(cameraObj && cameraObj.depth && obj.isAttachedToCamera)
		{
			depth += depth + cameraObj.depth;
		}
		return depth;
		}
	this.___needSorting___ = function() {
		for (var i = 0; i < this.numChildren - 1; i++)
		{
			var prevDepth = this.___GetDepth___(this.getChildAt(i));
			var nextDepth = this.___GetDepth___(this.getChildAt(i + 1));
			if (prevDepth < nextDepth)
				return true;
		}
		return false;
	}
	this.___sortFunction___ = function(obj1, obj2) {
		return (this.exportRoot.___GetDepth___(obj2) - this.exportRoot.___GetDepth___(obj1));
	}
	this.on('tick', function (event){
		var curTimeline = event.currentTarget;
		if (curTimeline.___needSorting___()){
			this.sortChildren(curTimeline.___sortFunction___);
		}
	});

	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		this.start_btn = this.button.start_btn;
		var self = this;
		self.stop();
		
		self.start_btn.addEventListener("click", startAnimation);
		
		function startAnimation(e)
		{
			self.gotoAndPlay(1);
		}
	}
	this.frame_1 = function() {
		var soundInstance = playSound("music",0);
		this.InsertIntoSoundStreamData(soundInstance,1,905,1);
	}
	this.frame_2 = function() {
		this.start_btn = undefined;
	}
	this.frame_133 = function() {
		playSound("part1");
	}
	this.frame_319 = function() {
		playSound("part2");
	}
	this.frame_432 = function() {
		playSound("part3");
	}
	this.frame_542 = function() {
		playSound("part4");
	}
	this.frame_691 = function() {
		playSound("clock");
	}
	this.frame_770 = function() {
		var soundInstance = playSound("part5",0);
		this.InsertIntoSoundStreamData(soundInstance,770,905,1);
	}
	this.frame_865 = function() {
		this.startAgain_btn = this.button.startAgain_btn;
	}
	this.frame_904 = function() {
		this.startAgain_btn = undefined;this.startAgain_btn = this.button.startAgain_btn;
		this.___loopingOver___ = true;
		var self = this;
		
		self.stop();
		
		self.startAgain_btn.addEventListener("click", replayAnimation);
		
		function replayAnimation(e)
		{
			self.gotoAndPlay(1);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(1).call(this.frame_2).wait(131).call(this.frame_133).wait(186).call(this.frame_319).wait(113).call(this.frame_432).wait(110).call(this.frame_542).wait(149).call(this.frame_691).wait(79).call(this.frame_770).wait(95).call(this.frame_865).wait(39).call(this.frame_904).wait(1));

	// Camera
	this.___camera___instance = new lib.___Camera___();
	this.___camera___instance.name = "___camera___instance";
	this.___camera___instance.setTransform(640,360);
	this.___camera___instance.depth = 0;
	this.___camera___instance.visible = false;

	this.timeline.addTween(cjs.Tween.get(this.___camera___instance).wait(1).to({scaleX:0.9941,scaleY:0.9941,x:640.0445,y:361.1034},0).wait(1).to({scaleX:0.9882,scaleY:0.9882,x:640.0891,y:362.2067},0).wait(1).to({scaleX:0.9823,scaleY:0.9823,x:640.1336,y:363.3101},0).wait(1).to({scaleX:0.9764,scaleY:0.9764,x:640.1782,y:364.4135},0).wait(1).to({scaleX:0.9705,scaleY:0.9705,x:640.2227,y:365.5168},0).wait(1).to({scaleX:0.9646,scaleY:0.9646,x:640.2672,y:366.6202},0).wait(1).to({scaleX:0.9587,scaleY:0.9587,x:640.3118,y:367.7235},0).wait(1).to({scaleX:0.9528,scaleY:0.9528,x:640.3563,y:368.8269},0).wait(1).to({scaleX:0.9469,scaleY:0.9469,x:640.4008,y:369.9303},0).wait(1).to({scaleX:0.941,scaleY:0.941,x:640.4454,y:371.0336},0).wait(1).to({scaleX:0.935,scaleY:0.935,x:640.4899,y:372.137},0).wait(1).to({scaleX:0.9291,scaleY:0.9291,x:640.5345,y:373.2403},0).wait(1).to({scaleX:0.9232,scaleY:0.9232,x:640.579,y:374.3437},0).wait(1).to({scaleX:0.9173,scaleY:0.9173,x:640.6235,y:375.4471},0).wait(1).to({scaleX:0.9114,scaleY:0.9114,x:640.6681,y:376.5504},0).wait(1).to({scaleX:0.9055,scaleY:0.9055,x:640.7126,y:377.6538},0).wait(1).to({scaleX:0.8996,scaleY:0.8996,x:640.7571,y:378.7571},0).wait(1).to({scaleX:0.8937,scaleY:0.8937,x:640.8017,y:379.8605},0).wait(1).to({scaleX:0.8878,scaleY:0.8878,x:640.8462,y:380.9639},0).wait(1).to({scaleX:0.8819,scaleY:0.8819,x:640.8908,y:382.0672},0).wait(1).to({scaleX:0.876,scaleY:0.876,x:640.9353,y:383.1706},0).wait(1).to({scaleX:0.8701,scaleY:0.8701,x:640.9798,y:384.274},0).wait(1).to({scaleX:0.8642,scaleY:0.8642,x:641.0244,y:385.3773},0).wait(1).to({scaleX:0.8583,scaleY:0.8583,x:641.0689,y:386.4807},0).wait(1).to({scaleX:0.8524,scaleY:0.8524,x:641.1134,y:387.584},0).wait(1).to({scaleX:0.8465,scaleY:0.8465,x:641.158,y:388.6874},0).wait(1).to({scaleX:0.8406,scaleY:0.8406,x:641.2025,y:389.7908},0).wait(1).to({scaleX:0.8347,scaleY:0.8347,x:641.2471,y:390.8941},0).wait(1).to({scaleX:0.8288,scaleY:0.8288,x:641.2916,y:391.9975},0).wait(1).to({scaleX:0.8229,scaleY:0.8229,x:641.3361,y:393.1008},0).wait(1).to({scaleX:0.817,scaleY:0.817,x:641.3807,y:394.2042},0).wait(1).to({scaleX:0.8111,scaleY:0.8111,x:641.4252,y:395.3076},0).wait(1).to({scaleX:0.8051,scaleY:0.8051,x:641.4698,y:396.4109},0).wait(1).to({scaleX:0.7992,scaleY:0.7992,x:641.5143,y:397.5143},0).wait(1).to({scaleX:0.7933,scaleY:0.7933,x:641.5588,y:398.6177},0).wait(1).to({scaleX:0.7874,scaleY:0.7874,x:641.6034,y:399.721},0).wait(1).to({scaleX:0.7815,scaleY:0.7815,x:641.6479,y:400.8244},0).wait(1).to({scaleX:0.7756,scaleY:0.7756,x:641.6924,y:401.9277},0).wait(1).to({scaleX:0.7697,scaleY:0.7697,x:641.737,y:403.0311},0).wait(1).to({scaleX:0.7638,scaleY:0.7638,x:641.7815,y:404.1345},0).wait(1).to({scaleX:0.7579,scaleY:0.7579,x:641.8261,y:405.2378},0).wait(1).to({scaleX:0.752,scaleY:0.752,x:641.8706,y:406.3412},0).wait(1).to({scaleX:0.7461,scaleY:0.7461,x:641.9151,y:407.4445},0).wait(1).to({scaleX:0.7402,scaleY:0.7402,x:641.9597,y:408.5479},0).wait(1).to({scaleX:0.7343,scaleY:0.7343,x:642.0042,y:409.6513},0).wait(1).to({scaleX:0.7284,scaleY:0.7284,x:642.0487,y:410.7546},0).wait(1).to({scaleX:0.7225,scaleY:0.7225,x:642.0933,y:411.858},0).wait(1).to({scaleX:0.7166,scaleY:0.7166,x:642.1378,y:412.9613},0).wait(1).to({scaleX:0.7107,scaleY:0.7107,x:642.1824,y:414.0647},0).wait(1).to({scaleX:0.7048,scaleY:0.7048,x:642.2269,y:415.1681},0).wait(1).to({scaleX:0.6989,scaleY:0.6989,x:642.2714,y:416.2714},0).wait(1).to({scaleX:0.693,scaleY:0.693,x:642.316,y:417.3748},0).wait(1).to({scaleX:0.6871,scaleY:0.6871,x:642.3605,y:418.4782},0).wait(1).to({scaleX:0.6811,scaleY:0.6811,x:642.405,y:419.5815},0).wait(1).to({scaleX:0.6752,scaleY:0.6752,x:642.4496,y:420.6849},0).wait(1).to({scaleX:0.6693,scaleY:0.6693,x:642.4941,y:421.7882},0).wait(1).to({scaleX:0.6634,scaleY:0.6634,x:642.5387,y:422.8916},0).wait(1).to({scaleX:0.6575,scaleY:0.6575,x:642.5832,y:423.995},0).wait(1).to({scaleX:0.6516,scaleY:0.6516,x:642.6277,y:425.0983},0).wait(1).to({scaleX:0.6457,scaleY:0.6457,x:642.6723,y:426.2017},0).wait(1).to({scaleX:0.6398,scaleY:0.6398,x:642.7168,y:427.305},0).wait(1).to({scaleX:0.6339,scaleY:0.6339,x:642.7613,y:428.4084},0).wait(1).to({scaleX:0.628,scaleY:0.628,x:642.8059,y:429.5118},0).wait(1).to({scaleX:0.6221,scaleY:0.6221,x:642.8504,y:430.6151},0).wait(1).to({scaleX:0.6162,scaleY:0.6162,x:642.895,y:431.7185},0).wait(1).to({scaleX:0.6103,scaleY:0.6103,x:642.9395,y:432.8219},0).wait(1).to({scaleX:0.6044,scaleY:0.6044,x:642.984,y:433.9252},0).wait(1).to({scaleX:0.5985,scaleY:0.5985,x:643.0286,y:435.0286},0).wait(1).to({scaleX:0.5926,scaleY:0.5926,x:643.0731,y:436.1319},0).wait(1).to({scaleX:0.5867,scaleY:0.5867,x:643.1177,y:437.2353},0).wait(1).to({scaleX:0.5808,scaleY:0.5808,x:643.1622,y:438.3387},0).wait(1).to({scaleX:0.5749,scaleY:0.5749,x:643.2067,y:439.442},0).wait(1).to({scaleX:0.569,scaleY:0.569,x:643.2513,y:440.5454},0).wait(1).to({scaleX:0.5631,scaleY:0.5631,x:643.2958,y:441.6487},0).wait(1).to({scaleX:0.5572,scaleY:0.5572,x:643.3403,y:442.7521},0).wait(1).to({scaleX:0.5512,scaleY:0.5512,x:643.3849,y:443.8555},0).wait(1).to({scaleX:0.5453,scaleY:0.5453,x:643.4294,y:444.9588},0).wait(1).to({scaleX:0.5394,scaleY:0.5394,x:643.4739,y:446.0622},0).wait(1).to({scaleX:0.5335,scaleY:0.5335,x:643.5185,y:447.1656},0).wait(1).to({scaleX:0.5276,scaleY:0.5276,x:643.563,y:448.2689},0).wait(1).to({scaleX:0.5217,scaleY:0.5217,x:643.6076,y:449.3723},0).wait(1).to({scaleX:0.5158,scaleY:0.5158,x:643.6521,y:450.4756},0).wait(1).to({scaleX:0.5099,scaleY:0.5099,x:643.6966,y:451.579},0).wait(1).to({scaleX:0.504,scaleY:0.504,x:643.7412,y:452.6824},0).wait(1).to({scaleX:0.4981,scaleY:0.4981,x:643.7857,y:453.7857},0).wait(1).to({scaleX:0.4922,scaleY:0.4922,x:643.8303,y:454.8891},0).wait(1).to({scaleX:0.4863,scaleY:0.4863,x:643.8748,y:455.9924},0).wait(1).to({scaleX:0.4804,scaleY:0.4804,x:643.9193,y:457.0958},0).wait(1).to({scaleX:0.4745,scaleY:0.4745,x:643.9639,y:458.1992},0).wait(1).to({scaleX:0.4686,scaleY:0.4686,x:644.0084,y:459.3025},0).wait(1).to({scaleX:0.4627,scaleY:0.4627,x:644.0529,y:460.4059},0).wait(1).to({scaleX:0.4568,scaleY:0.4568,x:644.0975,y:461.5092},0).wait(1).to({scaleX:0.4509,scaleY:0.4509,x:644.142,y:462.6126},0).wait(1).to({scaleX:0.445,scaleY:0.445,x:644.1866,y:463.716},0).wait(1).to({scaleX:0.4391,scaleY:0.4391,x:644.2311,y:464.8193},0).wait(1).to({scaleX:0.4332,scaleY:0.4332,x:644.2756,y:465.9227},0).wait(1).to({scaleX:0.4273,scaleY:0.4273,x:644.3202,y:467.0261},0).wait(1).to({scaleX:0.4213,scaleY:0.4213,x:644.3647,y:468.1294},0).wait(1).to({scaleX:0.4154,scaleY:0.4154,x:644.4092,y:469.2328},0).wait(1).to({scaleX:0.4095,scaleY:0.4095,x:644.4538,y:470.3361},0).wait(1).to({scaleX:0.4036,scaleY:0.4036,x:644.4983,y:471.4395},0).wait(1).to({scaleX:0.3977,scaleY:0.3977,x:644.5429,y:472.5429},0).wait(1).to({scaleX:0.3918,scaleY:0.3918,x:644.5874,y:473.6462},0).wait(1).to({scaleX:0.3859,scaleY:0.3859,x:644.6319,y:474.7496},0).wait(1).to({scaleX:0.38,scaleY:0.38,x:644.6765,y:475.8529},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,x:644.721,y:476.9563},0).wait(1).to({scaleX:0.3682,scaleY:0.3682,x:644.7656,y:478.0597},0).wait(1).to({scaleX:0.3623,scaleY:0.3623,x:644.8101,y:479.163},0).wait(1).to({scaleX:0.3564,scaleY:0.3564,x:644.8546,y:480.2664},0).wait(1).to({scaleX:0.3505,scaleY:0.3505,x:644.8992,y:481.3698},0).wait(1).to({scaleX:0.3446,scaleY:0.3446,x:644.9437,y:482.4731},0).wait(1).to({scaleX:0.3387,scaleY:0.3387,x:644.9882,y:483.5765},0).wait(1).to({scaleX:0.3328,scaleY:0.3328,x:645.0328,y:484.6798},0).wait(1).to({scaleX:0.3269,scaleY:0.3269,x:645.0773,y:485.7832},0).wait(1).to({scaleX:0.321,scaleY:0.321,x:645.1219,y:486.8866},0).wait(1).to({scaleX:0.3151,scaleY:0.3151,x:645.1664,y:487.9899},0).wait(1).to({scaleX:0.3092,scaleY:0.3092,x:645.2109,y:489.0933},0).wait(1).to({scaleX:0.3033,scaleY:0.3033,x:645.2555,y:490.1966},0).wait(1).to({scaleX:0.2973,scaleY:0.2973,x:645.3,y:491.3},0).wait(67).to({scaleX:0.2939,scaleY:0.2939,x:646.91,y:492.2863},0).wait(1).to({scaleX:0.2905,scaleY:0.2905,x:648.52,y:493.2725},0).wait(1).to({scaleX:0.2871,scaleY:0.2871,x:650.13,y:494.2588},0).wait(1).to({scaleX:0.2837,scaleY:0.2837,x:651.74,y:495.245},0).wait(1).to({scaleX:0.2803,scaleY:0.2803,x:653.35,y:496.2313},0).wait(1).to({scaleX:0.2769,scaleY:0.2769,x:654.96,y:497.2175},0).wait(1).to({scaleX:0.2735,scaleY:0.2735,x:656.57,y:498.2038},0).wait(1).to({scaleX:0.2701,scaleY:0.2701,x:658.18,y:499.19},0).wait(1).to({scaleX:0.2667,scaleY:0.2667,x:659.79,y:500.1763},0).wait(1).to({scaleX:0.2633,scaleY:0.2633,x:661.4,y:501.1625},0).wait(1).to({scaleX:0.2599,scaleY:0.2599,x:663.01,y:502.1488},0).wait(1).to({scaleX:0.2565,scaleY:0.2565,x:664.62,y:503.135},0).wait(1).to({scaleX:0.2531,scaleY:0.2531,x:666.23,y:504.1213},0).wait(1).to({scaleX:0.2497,scaleY:0.2497,x:667.84,y:505.1075},0).wait(1).to({scaleX:0.2463,scaleY:0.2463,x:669.45,y:506.0938},0).wait(1).to({scaleX:0.2428,scaleY:0.2428,x:671.06,y:507.08},0).wait(1).to({scaleX:0.2394,scaleY:0.2394,x:672.67,y:508.0663},0).wait(1).to({scaleX:0.236,scaleY:0.236,x:674.28,y:509.0525},0).wait(1).to({scaleX:0.2326,scaleY:0.2326,x:675.89,y:510.0388},0).wait(1).to({scaleX:0.2292,scaleY:0.2292,x:677.5,y:511.025},0).wait(1).to({scaleX:0.2258,scaleY:0.2258,x:679.11,y:512.0113},0).wait(1).to({scaleX:0.2224,scaleY:0.2224,x:680.72,y:512.9975},0).wait(1).to({scaleX:0.219,scaleY:0.219,x:682.33,y:513.9838},0).wait(1).to({scaleX:0.2156,scaleY:0.2156,x:683.94,y:514.97},0).wait(1).to({scaleX:0.2122,scaleY:0.2122,x:685.55,y:515.9563},0).wait(1).to({scaleX:0.2088,scaleY:0.2088,x:687.16,y:516.9425},0).wait(1).to({scaleX:0.2054,scaleY:0.2054,x:688.77,y:517.9288},0).wait(1).to({scaleX:0.202,scaleY:0.202,x:690.38,y:518.915},0).wait(1).to({scaleX:0.1986,scaleY:0.1986,x:691.99,y:519.9013},0).wait(1).to({scaleX:0.1952,scaleY:0.1952,x:693.6,y:520.8875},0).wait(1).to({scaleX:0.1918,scaleY:0.1918,x:695.21,y:521.8738},0).wait(1).to({scaleX:0.1884,scaleY:0.1884,x:696.82,y:522.86},0).wait(1).to({scaleX:0.1849,scaleY:0.1849,x:698.43,y:523.8463},0).wait(1).to({scaleX:0.1815,scaleY:0.1815,x:700.04,y:524.8325},0).wait(1).to({scaleX:0.1781,scaleY:0.1781,x:701.65,y:525.8188},0).wait(1).to({scaleX:0.1747,scaleY:0.1747,x:703.26,y:526.805},0).wait(1).to({scaleX:0.1713,scaleY:0.1713,x:704.87,y:527.7913},0).wait(1).to({scaleX:0.1679,scaleY:0.1679,x:706.48,y:528.7775},0).wait(1).to({scaleX:0.1645,scaleY:0.1645,x:708.09,y:529.7638},0).wait(1).to({scaleX:0.1611,scaleY:0.1611,x:709.7,y:530.75},0).wait(317).to({scaleX:0.1629,scaleY:0.1629,x:708.9148,y:530.1106},0).wait(1).to({scaleX:0.1646,scaleY:0.1646,x:708.1296,y:529.4711},0).wait(1).to({scaleX:0.1664,scaleY:0.1664,x:707.3444,y:528.8317},0).wait(1).to({scaleX:0.1681,scaleY:0.1681,x:706.5592,y:528.1922},0).wait(1).to({scaleX:0.1699,scaleY:0.1699,x:705.7739,y:527.5528},0).wait(1).to({scaleX:0.1716,scaleY:0.1716,x:704.9887,y:526.9134},0).wait(1).to({scaleX:0.1734,scaleY:0.1734,x:704.2035,y:526.2739},0).wait(1).to({scaleX:0.1751,scaleY:0.1751,x:703.4183,y:525.6345},0).wait(1).to({scaleX:0.1769,scaleY:0.1769,x:702.6331,y:524.9951},0).wait(1).to({scaleX:0.1786,scaleY:0.1786,x:701.8479,y:524.3556},0).wait(1).to({scaleX:0.1804,scaleY:0.1804,x:701.0627,y:523.7162},0).wait(1).to({scaleX:0.1821,scaleY:0.1821,x:700.2775,y:523.0768},0).wait(1).to({scaleX:0.1839,scaleY:0.1839,x:699.4923,y:522.4373},0).wait(1).to({scaleX:0.1856,scaleY:0.1856,x:698.707,y:521.7979},0).wait(1).to({scaleX:0.1874,scaleY:0.1874,x:697.9218,y:521.1585},0).wait(1).to({scaleX:0.1892,scaleY:0.1892,x:697.1366,y:520.519},0).wait(1).to({scaleX:0.1909,scaleY:0.1909,x:696.3514,y:519.8796},0).wait(1).to({scaleX:0.1927,scaleY:0.1927,x:695.5662,y:519.2401},0).wait(1).to({scaleX:0.1944,scaleY:0.1944,x:694.781,y:518.6007},0).wait(1).to({scaleX:0.1962,scaleY:0.1962,x:693.9958,y:517.9613},0).wait(1).to({scaleX:0.1979,scaleY:0.1979,x:693.2106,y:517.3218},0).wait(1).to({scaleX:0.1997,scaleY:0.1997,x:692.4254,y:516.6824},0).wait(1).to({scaleX:0.2014,scaleY:0.2014,x:691.6401,y:516.043},0).wait(1).to({scaleX:0.2032,scaleY:0.2032,x:690.8549,y:515.4035},0).wait(1).to({scaleX:0.2049,scaleY:0.2049,x:690.0697,y:514.7641},0).wait(1).to({scaleX:0.2067,scaleY:0.2067,x:689.2845,y:514.1247},0).wait(1).to({scaleX:0.2084,scaleY:0.2084,x:688.4993,y:513.4852},0).wait(1).to({scaleX:0.2102,scaleY:0.2102,x:687.7141,y:512.8458},0).wait(1).to({scaleX:0.2119,scaleY:0.2119,x:686.9289,y:512.2063},0).wait(1).to({scaleX:0.2137,scaleY:0.2137,x:686.1437,y:511.5669},0).wait(1).to({scaleX:0.2154,scaleY:0.2154,x:685.3584,y:510.9275},0).wait(1).to({scaleX:0.2172,scaleY:0.2172,x:684.5732,y:510.288},0).wait(1).to({scaleX:0.219,scaleY:0.219,x:683.788,y:509.6486},0).wait(1).to({scaleX:0.2207,scaleY:0.2207,x:683.0028,y:509.0092},0).wait(1).to({scaleX:0.2225,scaleY:0.2225,x:682.2176,y:508.3697},0).wait(1).to({scaleX:0.2242,scaleY:0.2242,x:681.4324,y:507.7303},0).wait(1).to({scaleX:0.226,scaleY:0.226,x:680.6472,y:507.0909},0).wait(1).to({scaleX:0.2277,scaleY:0.2277,x:679.862,y:506.4514},0).wait(1).to({scaleX:0.2295,scaleY:0.2295,x:679.0768,y:505.812},0).wait(1).to({scaleX:0.2312,scaleY:0.2312,x:678.2916,y:505.1725},0).wait(1).to({scaleX:0.233,scaleY:0.233,x:677.5063,y:504.5331},0).wait(1).to({scaleX:0.2347,scaleY:0.2347,x:676.7211,y:503.8937},0).wait(1).to({scaleX:0.2365,scaleY:0.2365,x:675.9359,y:503.2542},0).wait(1).to({scaleX:0.2382,scaleY:0.2382,x:675.1507,y:502.6148},0).wait(1).to({scaleX:0.24,scaleY:0.24,x:674.3655,y:501.9754},0).wait(1).to({scaleX:0.2417,scaleY:0.2417,x:673.5803,y:501.3359},0).wait(1).to({scaleX:0.2435,scaleY:0.2435,x:672.7951,y:500.6965},0).wait(1).to({scaleX:0.2452,scaleY:0.2452,x:672.0099,y:500.057},0).wait(1).to({scaleX:0.247,scaleY:0.247,x:671.2247,y:499.4176},0).wait(1).to({scaleX:0.2488,scaleY:0.2488,x:670.4394,y:498.7782},0).wait(1).to({scaleX:0.2505,scaleY:0.2505,x:669.6542,y:498.1387},0).wait(1).to({scaleX:0.2523,scaleY:0.2523,x:668.869,y:497.4993},0).wait(1).to({scaleX:0.254,scaleY:0.254,x:668.0838,y:496.8599},0).wait(1).to({scaleX:0.2558,scaleY:0.2558,x:667.2986,y:496.2204},0).wait(1).to({scaleX:0.2575,scaleY:0.2575,x:666.5134,y:495.581},0).wait(1).to({scaleX:0.2593,scaleY:0.2593,x:665.7282,y:494.9416},0).wait(1).to({scaleX:0.261,scaleY:0.261,x:664.943,y:494.3021},0).wait(1).to({scaleX:0.2628,scaleY:0.2628,x:664.1578,y:493.6627},0).wait(1).to({scaleX:0.2645,scaleY:0.2645,x:663.3725,y:493.0232},0).wait(1).to({scaleX:0.2663,scaleY:0.2663,x:662.5873,y:492.3838},0).wait(1).to({scaleX:0.268,scaleY:0.268,x:661.8021,y:491.7444},0).wait(1).to({scaleX:0.2698,scaleY:0.2698,x:661.0169,y:491.1049},0).wait(1).to({scaleX:0.2715,scaleY:0.2715,x:660.2317,y:490.4655},0).wait(1).to({scaleX:0.2733,scaleY:0.2733,x:659.4465,y:489.8261},0).wait(1).to({scaleX:0.275,scaleY:0.275,x:658.6613,y:489.1866},0).wait(1).to({scaleX:0.2768,scaleY:0.2768,x:657.8761,y:488.5472},0).wait(1).to({scaleX:0.2786,scaleY:0.2786,x:657.0909,y:487.9078},0).wait(1).to({scaleX:0.2803,scaleY:0.2803,x:656.3056,y:487.2683},0).wait(1).to({scaleX:0.2821,scaleY:0.2821,x:655.5204,y:486.6289},0).wait(1).to({scaleX:0.2838,scaleY:0.2838,x:654.7352,y:485.9894},0).wait(1).to({scaleX:0.2856,scaleY:0.2856,x:653.95,y:485.35},0).wait(122).to({scaleX:0.2812,scaleY:0.2812,x:655.5783,y:486.975},0).wait(1).to({scaleX:0.2768,scaleY:0.2768,x:657.2067,y:488.6},0).wait(1).to({scaleX:0.2725,scaleY:0.2725,x:658.835,y:490.225},0).wait(1).to({scaleX:0.2681,scaleY:0.2681,x:660.4633,y:491.85},0).wait(1).to({scaleX:0.2637,scaleY:0.2637,x:662.0917,y:493.475},0).wait(1).to({scaleX:0.2594,scaleY:0.2594,x:663.72,y:495.1},0).wait(1).to({scaleX:0.255,scaleY:0.255,x:665.3483,y:496.725},0).wait(1).to({scaleX:0.2506,scaleY:0.2506,x:666.9767,y:498.35},0).wait(1).to({scaleX:0.2462,scaleY:0.2462,x:668.605,y:499.975},0).wait(1).to({scaleX:0.2419,scaleY:0.2419,x:670.2333,y:501.6},0).wait(1).to({scaleX:0.2375,scaleY:0.2375,x:671.8617,y:503.225},0).wait(1).to({scaleX:0.2331,scaleY:0.2331,x:673.49,y:504.85},0).wait(1).to({scaleX:0.2288,scaleY:0.2288,x:675.1183,y:506.475},0).wait(1).to({scaleX:0.2244,scaleY:0.2244,x:676.7467,y:508.1},0).wait(1).to({scaleX:0.22,scaleY:0.22,x:678.375,y:509.725},0).wait(1).to({scaleX:0.2157,scaleY:0.2157,x:680.0033,y:511.35},0).wait(1).to({scaleX:0.2113,scaleY:0.2113,x:681.6317,y:512.975},0).wait(1).to({scaleX:0.2069,scaleY:0.2069,x:683.26,y:514.6},0).wait(1).to({scaleX:0.2025,scaleY:0.2025,x:684.8883,y:516.225},0).wait(1).to({scaleX:0.1982,scaleY:0.1982,x:686.5167,y:517.85},0).wait(1).to({scaleX:0.1938,scaleY:0.1938,x:688.145,y:519.475},0).wait(1).to({scaleX:0.1894,scaleY:0.1894,x:689.7733,y:521.1},0).wait(1).to({scaleX:0.1851,scaleY:0.1851,x:691.4017,y:522.725},0).wait(1).to({scaleX:0.1807,scaleY:0.1807,x:693.03,y:524.35},0).wait(1).to({scaleX:0.1763,scaleY:0.1763,x:694.6583,y:525.975},0).wait(1).to({scaleX:0.172,scaleY:0.172,x:696.2867,y:527.6},0).wait(1).to({scaleX:0.1676,scaleY:0.1676,x:697.915,y:529.225},0).wait(1).to({scaleX:0.1632,scaleY:0.1632,x:699.5433,y:530.85},0).wait(1).to({scaleX:0.1588,scaleY:0.1588,x:701.1717,y:532.475},0).wait(1).to({scaleX:0.1545,scaleY:0.1545,x:702.8,y:534.1},0).wait(142));

	// button_obj_
	this.button = new lib.Scene_1_button();
	this.button.name = "button";
	this.button.setTransform(653.4,418.5,1,1,0,0,0,653.4,418.5);
	this.button.depth = 0;
	this.button.isAttachedToCamera = 0
	this.button.isAttachedToMask = 0
	this.button.layerDepth = 0
	this.button.layerIndex = 0
	this.button.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.button).wait(2).to({regX:653.2,regY:420.1,scaleX:1.0119,scaleY:1.0119,x:653.3,y:418.55},0).wait(862).to({regX:704.9,regY:543.1,scaleX:6.4733,scaleY:6.4733,x:653.5,y:418.2},0).wait(41));

	// btn_BG_obj_
	this.btn_BG = new lib.Scene_1_btn_BG();
	this.btn_BG.name = "btn_BG";
	this.btn_BG.setTransform(639.1,356.4,1,1,0,0,0,639.1,356.4);
	this.btn_BG.depth = 0;
	this.btn_BG.isAttachedToCamera = 0
	this.btn_BG.isAttachedToMask = 0
	this.btn_BG.layerDepth = 0
	this.btn_BG.layerIndex = 1
	this.btn_BG.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.btn_BG).to({_off:true},1).wait(904));

	// white_board_obj_
	this.white_board = new lib.Scene_1_white_board();
	this.white_board.name = "white_board";
	this.white_board.depth = 0;
	this.white_board.isAttachedToCamera = 0
	this.white_board.isAttachedToMask = 0
	this.white_board.layerDepth = 0
	this.white_board.layerIndex = 2
	this.white_board.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.white_board).wait(105).to({regX:401.4,regY:339.1,scaleX:2.6315,scaleY:2.6315,x:-0.1,y:0.15},0).to({regX:455.1,regY:384.3,scaleX:3.3632,scaleY:3.3632,x:0.2,y:0.05},14).wait(15).to({_off:true},1).wait(770));

	// bird_obj_
	this.bird = new lib.Scene_1_bird();
	this.bird.name = "bird";
	this.bird.depth = 0;
	this.bird.isAttachedToCamera = 0
	this.bird.isAttachedToMask = 0
	this.bird.layerDepth = 0
	this.bird.layerIndex = 3
	this.bird.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.bird).wait(1).to({regX:3.8,regY:3.2,scaleX:1.0059,scaleY:1.0059,y:-0.05},0).wait(1).to({regX:672.2,regY:173,scaleX:1,scaleY:1,x:668.45,y:169.8},0).wait(117).to({_off:true},1).wait(785));

	// V_Sign_obj_
	this.V_Sign = new lib.Scene_1_V_Sign();
	this.V_Sign.name = "V_Sign";
	this.V_Sign.depth = 0;
	this.V_Sign.isAttachedToCamera = 0
	this.V_Sign.isAttachedToMask = 0
	this.V_Sign.layerDepth = 0
	this.V_Sign.layerIndex = 4
	this.V_Sign.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.V_Sign).wait(779).to({regX:604,regY:478.5,scaleX:6.4733,scaleY:6.4733,x:0.35,y:0.05},0).wait(126));

	// muscle_obj_
	this.muscle = new lib.Scene_1_muscle();
	this.muscle.name = "muscle";
	this.muscle.depth = 0;
	this.muscle.isAttachedToCamera = 0
	this.muscle.isAttachedToMask = 0
	this.muscle.layerDepth = 0
	this.muscle.layerIndex = 5
	this.muscle.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.muscle).wait(768).to({regX:604,regY:478.5,scaleX:6.4733,scaleY:6.4733,x:0.35,y:0.05},0).wait(137));

	// sweat_drop3_obj_
	this.sweat_drop3 = new lib.Scene_1_sweat_drop3();
	this.sweat_drop3.name = "sweat_drop3";
	this.sweat_drop3.depth = 0;
	this.sweat_drop3.isAttachedToCamera = 0
	this.sweat_drop3.isAttachedToMask = 0
	this.sweat_drop3.layerDepth = 0
	this.sweat_drop3.layerIndex = 6
	this.sweat_drop3.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sweat_drop3).wait(799).to({regX:604,regY:478.5,scaleX:6.4733,scaleY:6.4733,x:0.35,y:0.05},0).wait(84).to({_off:true},1).wait(21));

	// sweat_drop2_obj_
	this.sweat_drop2 = new lib.Scene_1_sweat_drop2();
	this.sweat_drop2.name = "sweat_drop2";
	this.sweat_drop2.depth = 0;
	this.sweat_drop2.isAttachedToCamera = 0
	this.sweat_drop2.isAttachedToMask = 0
	this.sweat_drop2.layerDepth = 0
	this.sweat_drop2.layerIndex = 7
	this.sweat_drop2.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sweat_drop2).wait(783).to({regX:604,regY:478.5,scaleX:6.4733,scaleY:6.4733,x:0.35,y:0.05},0).wait(82).to({_off:true},1).wait(39));

	// sweat_drop1_obj_
	this.sweat_drop1 = new lib.Scene_1_sweat_drop1();
	this.sweat_drop1.name = "sweat_drop1";
	this.sweat_drop1.depth = 0;
	this.sweat_drop1.isAttachedToCamera = 0
	this.sweat_drop1.isAttachedToMask = 0
	this.sweat_drop1.layerDepth = 0
	this.sweat_drop1.layerIndex = 8
	this.sweat_drop1.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sweat_drop1).wait(768).to({regX:604,regY:478.5,scaleX:6.4733,scaleY:6.4733,x:0.35,y:0.05},0).wait(33).to({_off:true},1).wait(103));

	// men_obj_
	this.men = new lib.Scene_1_men();
	this.men.name = "men";
	this.men.depth = 0;
	this.men.isAttachedToCamera = 0
	this.men.isAttachedToMask = 0
	this.men.layerDepth = 0
	this.men.layerIndex = 9
	this.men.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.men).wait(120).to({regX:455.1,regY:384.3,scaleX:3.3632,scaleY:3.3632,x:0.2,y:0.05},0).wait(785));

	// fan_obj_
	this.fan = new lib.Scene_1_fan();
	this.fan.name = "fan";
	this.fan.depth = 0;
	this.fan.isAttachedToCamera = 0
	this.fan.isAttachedToMask = 0
	this.fan.layerDepth = 0
	this.fan.layerIndex = 10
	this.fan.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.fan).wait(119).to({regX:455.1,regY:384.3,scaleX:3.3632,scaleY:3.3632,x:0.2,y:0.05},0).wait(786));

	// BG_obj_
	this.BG = new lib.Scene_1_BG();
	this.BG.name = "BG";
	this.BG.depth = 0;
	this.BG.isAttachedToCamera = 0
	this.BG.isAttachedToMask = 0
	this.BG.layerDepth = 0
	this.BG.layerIndex = 11
	this.BG.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.BG).wait(120).to({regX:455.1,regY:384.3,scaleX:3.3632,scaleY:3.3632,x:0.2,y:0.05},0).wait(785));

	// car_obj_
	this.car = new lib.Scene_1_car();
	this.car.name = "car";
	this.car.depth = 0;
	this.car.isAttachedToCamera = 0
	this.car.isAttachedToMask = 0
	this.car.layerDepth = 0
	this.car.layerIndex = 12
	this.car.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.car).wait(1).to({regX:3.8,regY:3.2,scaleX:1.0059,scaleY:1.0059,y:-0.05},0).to({regX:455.1,regY:384.3,scaleX:3.3632,scaleY:3.3632,x:0.2,y:0.05},118).to({_off:true},1).wait(785));

	// leftDoorAnimation_obj_
	this.leftDoorAnimation = new lib.Scene_1_leftDoorAnimation();
	this.leftDoorAnimation.name = "leftDoorAnimation";
	this.leftDoorAnimation.depth = 0;
	this.leftDoorAnimation.isAttachedToCamera = 0
	this.leftDoorAnimation.isAttachedToMask = 0
	this.leftDoorAnimation.layerDepth = 0
	this.leftDoorAnimation.layerIndex = 13
	this.leftDoorAnimation.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.leftDoorAnimation).wait(84).to({regX:321.2,regY:271.2,scaleX:1.9841,scaleY:1.9841,x:0.1,y:-0.05},0).to({regX:412.9,regY:348.8,scaleX:2.7602,scaleY:2.7602,x:-0.1,y:0.15},24).to({_off:true},12).wait(785));

	// innerDoors_obj_
	this.innerDoors = new lib.Scene_1_innerDoors();
	this.innerDoors.name = "innerDoors";
	this.innerDoors.setTransform(635.5,531,1,1,0,0,0,635.5,531);
	this.innerDoors.depth = 0;
	this.innerDoors.isAttachedToCamera = 0
	this.innerDoors.isAttachedToMask = 0
	this.innerDoors.layerDepth = 0
	this.innerDoors.layerIndex = 14
	this.innerDoors.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.innerDoors).wait(84).to({regX:641.4,regY:538.9,scaleX:1.9841,scaleY:1.9841,x:635.4,y:531.1},0).to({regX:643.1,regY:541.1,scaleX:2.7602,scaleY:2.7602,x:635.3,y:530.95},24).to({_off:true},12).wait(785));

	// outlineDoors_obj_
	this.outlineDoors = new lib.Scene_1_outlineDoors();
	this.outlineDoors.name = "outlineDoors";
	this.outlineDoors.setTransform(641.1,531.7,1,1,0,0,0,641.1,531.7);
	this.outlineDoors.depth = 0;
	this.outlineDoors.isAttachedToCamera = 0
	this.outlineDoors.isAttachedToMask = 0
	this.outlineDoors.layerDepth = 0
	this.outlineDoors.layerIndex = 15
	this.outlineDoors.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.outlineDoors).to({_off:true},120).wait(785));

	// gym_doors_obj_
	this.gym_doors = new lib.Scene_1_gym_doors();
	this.gym_doors.name = "gym_doors";
	this.gym_doors.setTransform(641.1,530,1,1,0,0,0,641.1,530);
	this.gym_doors.depth = 0;
	this.gym_doors.isAttachedToCamera = 0
	this.gym_doors.isAttachedToMask = 0
	this.gym_doors.layerDepth = 0
	this.gym_doors.layerIndex = 16
	this.gym_doors.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.gym_doors).to({_off:true},120).wait(785));

	// sideWalk_obj_
	this.sideWalk = new lib.Scene_1_sideWalk();
	this.sideWalk.name = "sideWalk";
	this.sideWalk.setTransform(642.9,632.5,1,1,0,0,0,642.9,632.5);
	this.sideWalk.depth = 0;
	this.sideWalk.isAttachedToCamera = 0
	this.sideWalk.isAttachedToMask = 0
	this.sideWalk.layerDepth = 0
	this.sideWalk.layerIndex = 17
	this.sideWalk.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.sideWalk).to({_off:true},120).wait(785));

	// front_gym_obj_
	this.front_gym = new lib.Scene_1_front_gym();
	this.front_gym.name = "front_gym";
	this.front_gym.setTransform(638,423,1,1,0,0,0,638,423);
	this.front_gym.depth = 0;
	this.front_gym.isAttachedToCamera = 0
	this.front_gym.isAttachedToMask = 0
	this.front_gym.layerDepth = 0
	this.front_gym.layerIndex = 18
	this.front_gym.maskLayerName = 0

	this.timeline.addTween(cjs.Tween.get(this.front_gym).to({_off:true},120).wait(785));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(638.7,352.8,648.3,368.49999999999994);
// library properties:
lib.properties = {
	id: '34D0803FCEC9064F94725C835386912F',
	width: 1280,
	height: 720,
	fps: 25,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_7.png?1617008023492", id:"CachedBmp_7"},
		{src:"images/gym_atlas_1.png?1617008023314", id:"gym_atlas_1"},
		{src:"images/gym_atlas_2.png?1617008023314", id:"gym_atlas_2"},
		{src:"sounds/clock.mp3?1617008023492", id:"clock"},
		{src:"sounds/music.mp3?1617008023492", id:"music"},
		{src:"sounds/part1.mp3?1617008023492", id:"part1"},
		{src:"sounds/part2.mp3?1617008023492", id:"part2"},
		{src:"sounds/part3.mp3?1617008023492", id:"part3"},
		{src:"sounds/part4.mp3?1617008023492", id:"part4"},
		{src:"sounds/part5.mp3?1617008023492", id:"part5"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['34D0803FCEC9064F94725C835386912F'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}

p._getProjectionMatrix = function(container, totalDepth) {	var focalLength = 528.25;
	var projectionCenter = { x : lib.properties.width/2, y : lib.properties.height/2 };
	var scale = (totalDepth + focalLength)/focalLength;
	var scaleMat = new createjs.Matrix2D;
	scaleMat.a = 1/scale;
	scaleMat.d = 1/scale;
	var projMat = new createjs.Matrix2D;
	projMat.tx = -projectionCenter.x;
	projMat.ty = -projectionCenter.y;
	projMat = projMat.prependMatrix(scaleMat);
	projMat.tx += projectionCenter.x;
	projMat.ty += projectionCenter.y;
	return projMat;
}
p._handleTick = function(event) {
	var cameraInstance = exportRoot.___camera___instance;
	if(cameraInstance !== undefined && cameraInstance.pinToObject !== undefined)
	{
		cameraInstance.x = cameraInstance.pinToObject.x + cameraInstance.pinToObject.pinOffsetX;
		cameraInstance.y = cameraInstance.pinToObject.y + cameraInstance.pinToObject.pinOffsetY;
		if(cameraInstance.pinToObject.parent !== undefined && cameraInstance.pinToObject.parent.depth !== undefined)
		cameraInstance.depth = cameraInstance.pinToObject.parent.depth + cameraInstance.pinToObject.pinOffsetZ;
	}
	stage._applyLayerZDepth(exportRoot);
}
p._applyLayerZDepth = function(parent)
{
	var cameraInstance = parent.___camera___instance;
	var focalLength = 528.25;
	var projectionCenter = { 'x' : 0, 'y' : 0};
	if(parent === exportRoot)
	{
		var stageCenter = { 'x' : lib.properties.width/2, 'y' : lib.properties.height/2 };
		projectionCenter.x = stageCenter.x;
		projectionCenter.y = stageCenter.y;
	}
	for(child in parent.children)
	{
		var layerObj = parent.children[child];
		if(layerObj == cameraInstance)
			continue;
		stage._applyLayerZDepth(layerObj, cameraInstance);
		if(layerObj.layerDepth === undefined)
			continue;
		if(layerObj.currentFrame != layerObj.parent.currentFrame)
		{
			layerObj.gotoAndPlay(layerObj.parent.currentFrame);
		}
		var matToApply = new createjs.Matrix2D;
		var cameraMat = new createjs.Matrix2D;
		var totalDepth = layerObj.layerDepth ? layerObj.layerDepth : 0;
		var cameraDepth = 0;
		if(cameraInstance && !layerObj.isAttachedToCamera)
		{
			var mat = cameraInstance.getMatrix();
			mat.tx -= projectionCenter.x;
			mat.ty -= projectionCenter.y;
			cameraMat = mat.invert();
			cameraMat.prependTransform(projectionCenter.x, projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			cameraMat.appendTransform(-projectionCenter.x, -projectionCenter.y, 1, 1, 0, 0, 0, 0, 0);
			if(cameraInstance.depth)
				cameraDepth = cameraInstance.depth;
		}
		if(layerObj.depth)
		{
			totalDepth = layerObj.depth;
		}
		//Offset by camera depth
		totalDepth -= cameraDepth;
		if(totalDepth < -focalLength)
		{
			matToApply.a = 0;
			matToApply.d = 0;
		}
		else
		{
			if(layerObj.layerDepth)
			{
				var sizeLockedMat = stage._getProjectionMatrix(parent, layerObj.layerDepth);
				if(sizeLockedMat)
				{
					sizeLockedMat.invert();
					matToApply.prependMatrix(sizeLockedMat);
				}
			}
			matToApply.prependMatrix(cameraMat);
			var projMat = stage._getProjectionMatrix(parent, totalDepth);
			if(projMat)
			{
				matToApply.prependMatrix(projMat);
			}
		}
		layerObj.transformMatrix = matToApply;
	}
}
an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}

// Virtual camera API : 

an.VirtualCamera = new function() {
var _camera = new Object();
function VC(timeline) {
	this.timeline = timeline;
	this.camera = timeline.___camera___instance;
	this.centerX = lib.properties.width / 2;
	this.centerY = lib.properties.height / 2;
	this.camAxisX = this.camera.x;
	this.camAxisY = this.camera.y;
	if(timeline.___camera___instance == null || timeline.___camera___instance == undefined ) {
		timeline.___camera___instance = new cjs.MovieClip();
		timeline.___camera___instance.visible = false;
		timeline.___camera___instance.parent = timeline;
		timeline.___camera___instance.setTransform(this.centerX, this.centerY);
	}
	this.camera = timeline.___camera___instance;
}

VC.prototype.moveBy = function(x, y, z) {
z = typeof z !== 'undefined' ? z : 0;
	var position = this.___getCamPosition___();
	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	this.camAxisX = this.camAxisX - x;
	this.camAxisY = this.camAxisY - y;
	var posX = position.x + offX;
	var posY = position.y + offY;
	this.camera.x = this.centerX - posX;
	this.camera.y = this.centerY - posY;
	this.camera.depth += z;
};

VC.prototype.setPosition = function(x, y, z) {
	z = typeof z !== 'undefined' ? z : 0;

	const MAX_X = 10000;
	const MIN_X = -10000;
	const MAX_Y = 10000;
	const MIN_Y = -10000;
	const MAX_Z = 10000;
	const MIN_Z = -5000;

	if(x > MAX_X)
	  x = MAX_X;
	else if(x < MIN_X)
	  x = MIN_X;
	if(y > MAX_Y)
	  y = MAX_Y;
	else if(y < MIN_Y)
	  y = MIN_Y;
	if(z > MAX_Z)
	  z = MAX_Z;
	else if(z < MIN_Z)
	  z = MIN_Z;

	var rotAngle = this.getRotation()*Math.PI/180;
	var sinTheta = Math.sin(rotAngle);
	var cosTheta = Math.cos(rotAngle);
	var offX= x*cosTheta + y*sinTheta;
	var offY = y*cosTheta - x*sinTheta;
	
	this.camAxisX = this.centerX - x;
	this.camAxisY = this.centerY - y;
	this.camera.x = this.centerX - offX;
	this.camera.y = this.centerY - offY;
	this.camera.depth = z;
};

VC.prototype.getPosition = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camAxisX;
	loc['y'] = this.centerY - this.camAxisY;
	loc['z'] = this.camera.depth;
	return loc;
};

VC.prototype.resetPosition = function() {
	this.setPosition(0, 0);
};

VC.prototype.zoomBy = function(zoom) {
	this.setZoom( (this.getZoom() * zoom) / 100);
};

VC.prototype.setZoom = function(zoom) {
	const MAX_zoom = 10000;
	const MIN_zoom = 1;
	if(zoom > MAX_zoom)
	zoom = MAX_zoom;
	else if(zoom < MIN_zoom)
	zoom = MIN_zoom;
	this.camera.scaleX = 100 / zoom;
	this.camera.scaleY = 100 / zoom;
};

VC.prototype.getZoom = function() {
	return 100 / this.camera.scaleX;
};

VC.prototype.resetZoom = function() {
	this.setZoom(100);
};

VC.prototype.rotateBy = function(angle) {
	this.setRotation( this.getRotation() + angle );
};

VC.prototype.setRotation = function(angle) {
	const MAX_angle = 180;
	const MIN_angle = -179;
	if(angle > MAX_angle)
		angle = MAX_angle;
	else if(angle < MIN_angle)
		angle = MIN_angle;
	this.camera.rotation = -angle;
};

VC.prototype.getRotation = function() {
	return -this.camera.rotation;
};

VC.prototype.resetRotation = function() {
	this.setRotation(0);
};

VC.prototype.reset = function() {
	this.resetPosition();
	this.resetZoom();
	this.resetRotation();
	this.unpinCamera();
};
VC.prototype.setZDepth = function(zDepth) {
	const MAX_zDepth = 10000;
	const MIN_zDepth = -5000;
	if(zDepth > MAX_zDepth)
		zDepth = MAX_zDepth;
	else if(zDepth < MIN_zDepth)
		zDepth = MIN_zDepth;
	this.camera.depth = zDepth;
}
VC.prototype.getZDepth = function() {
	return this.camera.depth;
}
VC.prototype.resetZDepth = function() {
	this.camera.depth = 0;
}

VC.prototype.pinCameraToObject = function(obj, offsetX, offsetY, offsetZ) {

	offsetX = typeof offsetX !== 'undefined' ? offsetX : 0;

	offsetY = typeof offsetY !== 'undefined' ? offsetY : 0;

	offsetZ = typeof offsetZ !== 'undefined' ? offsetZ : 0;
	if(obj === undefined)
		return;
	this.camera.pinToObject = obj;
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
};

VC.prototype.setPinOffset = function(offsetX, offsetY, offsetZ) {
	if(this.camera.pinToObject != undefined) {
	this.camera.pinToObject.pinOffsetX = offsetX;
	this.camera.pinToObject.pinOffsetY = offsetY;
	this.camera.pinToObject.pinOffsetZ = offsetZ;
	}
};

VC.prototype.unpinCamera = function() {
	this.camera.pinToObject = undefined;
};
VC.prototype.___getCamPosition___ = function() {
	var loc = new Object();
	loc['x'] = this.centerX - this.camera.x;
	loc['y'] = this.centerY - this.camera.y;
	loc['z'] = this.depth;
	return loc;
};

this.getCamera = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	if(_camera[timeline] == undefined)
	_camera[timeline] = new VC(timeline);
	return _camera[timeline];
}

this.getCameraAsMovieClip = function(timeline) {
	timeline = typeof timeline !== 'undefined' ? timeline : null;
	if(timeline === null) timeline = exportRoot;
	return this.getCamera(timeline).camera;
}
}


// Layer depth API : 

an.Layer = new function() {
	this.getLayerZDepth = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth; else 0;";
		return eval(script);
	}
	this.setLayerZDepth = function(timeline, layerName, zDepth)
	{
		const MAX_zDepth = 10000;
		const MIN_zDepth = -5000;
		if(zDepth > MAX_zDepth)
			zDepth = MAX_zDepth;
		else if(zDepth < MIN_zDepth)
			zDepth = MIN_zDepth;
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline." + layerName + ".depth = " + zDepth + ";";
		eval(script);
	}
	this.removeLayer = function(timeline, layerName)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		var script = "if(timeline." + layerName + ") timeline.removeChild(timeline." + layerName + ");";
		eval(script);
	}
	this.addNewLayer = function(timeline, layerName, zDepth)
	{
		if(layerName === "Camera")
		layerName = "___camera___instance";
		zDepth = typeof zDepth !== 'undefined' ? zDepth : 0;
		var layer = new createjs.MovieClip();
		layer.name = layerName;
		layer.depth = zDepth;
		layer.layerIndex = 0;
		timeline.addChild(layer);
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;