Avatar.createTrait('Eric', function (initValue, traits) {
	//default value
	var val = "hello - " + new Date().getTime();
	
	if (traits && traits.length > 0) {
		//dynamic value with other traits being used
		val = traits[0] + ' - ' + new Date().getTime();
	}

	return val;
});

Avatar.createTrait('height', function (initValue, traits) {
	//default value
	var val = "help me";
	if (traits && traits.length > 0) {
		//dynamic value with other traits being used
		val = traits[0] + ' - ' + new Date().getTime();
	}

	return val;
});