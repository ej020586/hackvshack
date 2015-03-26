function trait(name, val) {
	var self = this;
	self.name = name;
	self.input_val_is_func = (typeof val == 'function');
	self.inputVal = val;
	self.ran = false;
	self.value =
		self.obj = {};
	self.obj.run = function (initalValue, traits) {
		if (self.ran) {
			return self.value;
			return;
		}

		if (self.input_val_is_func) {
			self.value = self.inputVal(initalValue, traits);
		} else {
			self.value = self.inputVal;
		}

		return self.value;
	}

	Object.defineProperty(self.obj, 'value', {
		get: function () {
			return self.value;
		}
	});

	self.obj.name = name;

	return function () {
		return self.obj;
	}
};