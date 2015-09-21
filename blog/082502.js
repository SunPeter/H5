var p = new Promise(function(resovle, reject) {
    setTimeout(function() {
        resovle(new Error(1));
    }, 5000);
})
p.then(function(data) {
    return new Promise(function(resovle,reject){
    	resovle(data);
    })
}).catch(function(error){
	console.log("error:"+error);
});