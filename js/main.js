function avatar(val) {
	if (!val) {
		throw (new Error('Cant initialize avatar without a argumnet that is null or undefined'));
		return;
	}

	var self = this;
	self.initVal = val;
	self.traits = [];
	self.determiniations = [];
	self.obj = {};

	self.obj.setTrait = function (trait) {
		self.traits.push(trait);
	}

	Object.defineProperty(self.obj, 'determiniations', {
		set: function (det) {
			self.determiniations.push(det);
		}
	});
	
	self.getAllTraitValsExcept = function(trait){
		var r = [];
		
		for(var index in self.traits){
			var t = self.traits[index];
			if(t !== trait){
				r.push(t().run());
			}
		}
		
		return r;
	}

	self.obj.build = function () {
		for(var index in self.traits){
			var t = self.traits[index];
			var traits = self.getAllTraitValsExcept(t);
			t().run(traits);
		}
	}
	
	self.obj.getTrait = function(name){
		var r = false;
		for(var index in self.traits){
			var t = self.traits[index];
			if(t().name === name){
				r = t;
				break;
			}
		}
		
		return r;
	}
	
	self.obj.testTrait = function(trait){
		
		var t = self.traits;
		self.obj.setTrait(trait);
		self.obj.build();
		
		var _t = self.obj.getTrait(trait().name);
		
		var val = _t().value;
		
		self.traits = t;
		
		return val;
	}


	return self.obj;
}

function trait(name, val) {
	var self = this;
	self.name = name;
	self.input_val_is_func = (typeof val == 'function');
	self.inputVal = val;
	self.ran = false;
	self.value =
	self.obj = {};
	self.obj.run = function(traits){
		if(self.ran){
			return self.value;	
			return;
		}
		
		if(self.input_val_is_func){
			self.value = self.inputVal(traits);
		}else{
			self.value = self.inputVal;
		}
		
		return self.value;
	}
	
	Object.defineProperty(self.obj, 'value', {
		get:function(){
			return self.value;
		}
	});
	
	self.obj.name = name;

	return function () {
		return self.obj;
	}
};

var avatar = new avatar('Flower');

var mytrait = new trait('Eric', function (traits) {
	//default value
	var val = "hello - " + new Date().getTime();
	if (traits && traits.length > 0) {
		//dynamic value with other traits being used
		val = traits[0] + ' - ' + new Date().getTime();
	}

	return val;
});

avatar.setTrait(mytrait);

var mytrait2 = new trait('height', function (traits) {
	//default value
	var val = "help me";
	if (traits && traits.length > 0) {
		//dynamic value with other traits being used
		val = traits[0] + ' - ' + new Date().getTime();
	}

	return val;
});



console.log(avatar.testTrait(mytrait2));