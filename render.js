  (function(THREE){

	var up = new THREE.Vector3( 0, 1, 0 );
	var axis = new THREE.Vector3( );
	var matrix = [0, 0, -1, 0,
				0, 1, 0 ,0,
				1, 0, 0, 0,
				0, 0, 0 , 1];
	var m;
	
	// Create Scene
	const scene = new THREE.Scene();
	// Axis Helper
	//scene.add( new THREE.AxisHelper(20) );
	
	//Create renderer
	const renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x333333);
	renderer.domElement.id = "mycanvas";
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	//Append the Canvas
	document.body.appendChild(renderer.domElement);  
	
	//Create Camera
	var cameraPerspective = new THREE.PerspectiveCamera(
		50,	window.innerWidth / window.innerHeight,	0.1, 1000);
	

	//Add controls
	controls = new THREE.OrbitControls( cameraPerspective, renderer.domElement );
	controls.addEventListener( 'change', render ); // use if there is no animation loop
	controls.minDistance = 10;
	controls.maxDistance = 400;
	
	var star, planet, ring;
	var t = 0;
		
	// Ellipse class, which extends the virtual base class Curve
	function Ellipse( xRadius, yRadius, rotx=1, roty=1, rotz = 1, x=0, y=0, z=0 ) {
	
			THREE.Curve.call( this );
	
			// add radius as a property
			this.xRadius = xRadius;
			this.yRadius = yRadius;
			
			//Rotation and Translation in the Hard way.
			this.m = new THREE.Matrix4().multiplyMatrices(new THREE.Matrix4().makeRotationY(roty), new THREE.Matrix4().makeRotationX(rotx));
			this.m.multiplyMatrices(this.m, new THREE.Matrix4().makeRotationZ(rotz));
			this.m.multiplyMatrices(this.m, new THREE.Matrix4().makeTranslation(x,y,z));
			//this.m = m;
	}
	
	Ellipse.prototype = Object.create( THREE.Curve.prototype );
	Ellipse.prototype.constructor = Ellipse;
	
	// define the getPoint function for the subClass
	Ellipse.prototype.getPoint = function ( t ) {
	
		var radians = 2 * Math.PI * t;
	
		return new THREE.Vector3( this.xRadius * Math.cos( radians ),
								this.yRadius * Math.sin( radians ),
								0 ).applyMatrix4(this.m);
	
	};
	
	window.onload = function() {
	
		scene.name = "scene";
		//cameraPerspective.position.set(0, 250, 400);
		cameraPerspective.position.set(0, 250, 400);
		cameraPerspective.lookAt(scene.position);
		
		// add sunlight light
		// var directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);	
		//directionalLight.position.set(-200, 50, 250);
		//directionalLight.name = "directional";
		//scene.add(directionalLight);
		
		
		//Añadimos el ORB
		star = new THREE.Mesh(
			new THREE.SphereGeometry(100, 52, 32),
			new THREE.MeshPhongMaterial({ 
										color: 0x1A73E8,
										specular: 0x000000,
										shininess: 50,
										//map: texture,
										wireframe: true })
		);
		star.name = "star";
		star.position.set(0, 0, 0);
		scene.add(star);
		
		var colorplan = 0x1A73E8;
		
		//Añadimos el electron
		planet1 = new THREE.Mesh(
			new THREE.SphereGeometry(3, 32, 32),
			new THREE.MeshPhongMaterial({ color: colorplan, 
										specular: 0xaaaaaa,
										shininess: 10,
										wireframe: false })
		);
		planet1.name = "planet";
		planet1.position.set(100, 100, 0);
		scene.add(planet1);
		
		//Añadimos el electron2
		planet2 = new THREE.Mesh(
			new THREE.SphereGeometry(3, 32, 32),
			new THREE.MeshPhongMaterial({ color: colorplan, wireframe: true })
		);
		planet2.name = "planet2";
		planet2.position.set(80, 120, 0);
		scene.add(planet2);
		
		//Añadimos el electron3
		planet3 = new THREE.Mesh(
			new THREE.SphereGeometry(3, 32, 32),
			new THREE.MeshPhongMaterial({ color: colorplan, wireframe: true })
		);
		planet3.name = "planet";
		planet3.position.set(-80, 120, 0);
		scene.add(planet3);
		
		//Añadimos el electron4
		planet4 = new THREE.Mesh(
							new THREE.SphereGeometry(3, 32, 32),
							new THREE.MeshPhongMaterial({ color: colorplan, wireframe: true })
		);
		planet4.name = "planet";
		planet4.position.set(-100, 100, 0);
		scene.add(planet4);
		
		//Params for Ellipses
		var pathSegments = 128;
		var tubeRadius = 0.4;
		var radiusSegments = 32;
		var closed = true;
		var colororb = 0x888888;
		
		//Create Orbit1
		rotx = Math.PI/4;
		roty= (Math.PI)/2;
		rotz = 0;
		x = 0;
		y =0;
		z= 10;
		path1 = new Ellipse(110,140, rotx, roty, rotz, x, y, z);
		
		//Render the orbit1
		orbit1 = new THREE.Mesh( 
							new THREE.TubeBufferGeometry( path1, pathSegments, tubeRadius, radiusSegments, closed ),
							new THREE.MeshPhongMaterial( { color: colororb } ) 
		);
				
		scene.add( orbit1 );
		
		//Create Orbit2
		rotx =  Math.PI/4;
		roty= (Math.PI)/2;
		rotz = 0;
		x = 0;
		y =0;
		z= -10;
		path2 = new Ellipse(110,140,rotx, roty, rotz, x, y, z);
				
		//Render the orbit2
		orbit2 = new THREE.Mesh( 
							new THREE.TubeBufferGeometry( path2, pathSegments, tubeRadius, radiusSegments, closed ),
							new THREE.MeshPhongMaterial( { color: colororb } ) 
		);
		
		scene.add( orbit2 );
		
		//Orbit 3
		rotx =  -Math.PI/4;
		roty= (Math.PI)/2;
		rotz = 0;
		x = 0;
		y =0;
		z= -10;
		path3 = new Ellipse(110,140,rotx, roty, rotz, x, y, z);
		
		//Render the orbit3
		orbit3 = new THREE.Mesh( 
							new THREE.TubeBufferGeometry( path3, pathSegments, tubeRadius, radiusSegments, closed ),
							new THREE.MeshPhongMaterial( { color: colororb } ) 
		);
		scene.add( orbit3 );
		
		//Orbit 4
		rotx =  -Math.PI/4;
		roty= (Math.PI)/2;
		rotz = 0;
		x = 0;
		y =0;
		z= 10;
		path4 = new Ellipse(110,140,rotx, roty, rotz, x, y, z);
		
		//Render the orbit4
		orbit4 = new THREE.Mesh( 
						new THREE.TubeBufferGeometry( path4, pathSegments, tubeRadius, radiusSegments, closed ),
						new THREE.MeshPhongMaterial( { color: colororb } ) );
		scene.add( orbit4 );
		
		window.addEventListener(
			"resize",
			function() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize(window.innerWidth, window.innerHeight);
			},
			false
		);
		
		animate();
		
		};
		
		function animate() {
			requestAnimationFrame(animate);
			render();
		}
		
		//var quaternion = new THREE.Quaternion();
		
		function render() {
		
			pt = path1.getPoint( t );
			planet1.position.set( pt.x, pt.y, pt.z );
			
			pt2 = path2.getPoint( Math.PI/5 + t);
			planet2.position.set( pt2.x, pt2.y, pt2.z );
			
			pt3 = path3.getPoint( t );
			planet3.position.set( pt3.x, pt3.y, pt3.z );
			
			pt4 = path4.getPoint( Math.PI/5 + t );
			planet4.position.set( pt4.x, pt4.y, pt4.z );
			
			t += 0.003;
			
			
			star.rotation.y += 0.0011;
			renderer.render(scene, cameraPerspective);
	}

 })(window.THREE);
