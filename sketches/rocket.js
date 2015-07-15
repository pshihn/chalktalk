function() {
   this.label = "rocket";
   this.swipeTime = 0;
   this.velocity = 0;
   this.altitude = 0;

   this.swipe[2] = ['BLAST OFF!', function() { this.swipeTime = time + 0.5; }];

   this.render = function(elapsed) {
      if (this.yhi < 0)                                  // REMOVE WHEN GONE
         sketchToDelete = this;

      if (this.swipeTime > 0 && time > this.swipeTime) { // AFTER SWIPE
         this.velocity += 0.4 * elapsed;
         this.altitude += this.velocity;                    // ACCELERATE
      }
      m.rotateZ(-0.02 * this.altitude);                  // ANIMATE TRAJECTORY
      m.translate(0, this.altitude, 0);

      mCurve(makeSpline([[-.25,-1],[-.4,0],[0,1]]));     // DRAW FUSILAGE
      mCurve(makeSpline([[0,1],[ .4,0],[ .25,-1]]));

      mCurve([[-.4,0],[-.8,-.8],[-.35,-.8]]);            // DRAW WINGS
      mCurve([[ .4,0],[ .8,-.8],[ .35,-.8]]);

      this.afterSketch(function(elapsed) {               // THRUSTER FLAMES
         if (this.swipeTime != 0) {
            mCurve([[-.20, -1.10], [-.3, -1.4 + .7*noise2(10*time, 100)], 
                    [-.08, -1.15], [  0, -1.6 + .7*noise2(10*time, 200)], 
                    [ .08, -1.15], [ .3, -1.4 + .7*noise2(10*time, 300)],
		    [ .20, -1.10]]);
         }
      });
   }
}
