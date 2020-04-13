
function GameControl() {

	setTimeout(()=>{
		start();
	}, 2000 );

	function start() {

		assetManager.emptyBalls();

	};

	return {
		start
	};

};