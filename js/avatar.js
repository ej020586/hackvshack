function avatar(val) {
	var self = this;
	self.initVal = val;
	self.created = false;
	self.traits = [];
	self.determiniations = [];
	self.obj = {};
	
	self.waitingTestTraits = [];

	self.obj.create = function (val) {
		self.initVal = val;
		if (!val) {
			throw (new Error('Cant initialize avatar without a argumnet that is null or undefined'));
			return;
		}
		
		self.created = true;
		
		if(self.waitingTestTraits.length > 0){
			for(var index in self.waitingTestTraits){
				self.obj.testTrait(self.waitingTestTraits[index]);
			}
		}
	}

	self.obj.setTrait = function (trait) {
		self.traits.push(trait);
	}

	Object.defineProperty(self.obj, 'determiniations', {
		set: function (det) {
			self.determiniations.push(det);
		}
	});

	self.getAllTraitValsExcept = function (trait) {
		var r = [];

		for (var index in self.traits) {
			var t = self.traits[index];
			if (t !== trait) {
				r.push(t().run(self.initVal, []));
			}
		}

		return r;
	}

	self.obj.build = function () {
		if(!self.created){
			throw (new Error('Cant build the avatar without calling the create method'));
			return;
		}
		for (var index in self.traits) {
			var t = self.traits[index];
			var _traits = self.getAllTraitValsExcept(t);
			t().run(self.initVal, _traits);
			
			console.log("Trait ", t().name, " has a value of ", t().value);
		}
	}

	self.obj.getTrait = function (name) {
		var r = false;
		for (var index in self.traits) {
			var t = self.traits[index];
			if (t().name === name) {
				r = t;
				break;
			}
		}

		return r;
	}

	self.obj.testTrait = function (trait) {

		if(!self.created){
			self.waitingTestTraits.push(trait);
			return;
		}
		
		var t = self.traits;
		self.obj.setTrait(trait);
		self.obj.build();

		var _t = self.obj.getTrait(trait().name);

		var val = _t().value;

		self.traits = t;
	}
	
	self.obj.createTrait = function(name, func){
		var t = new trait(name, func);
		
		self.obj.setTrait(t);
	}

	return self.obj;
}

var Avatar = new avatar();

