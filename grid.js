class Grid {
    constructor(_x=10,_y=10){
      this.x = _x; // number of columns
      this.y = _y; // number of rows
  
      this.posX = 0
      this.posY = 0
  
      this.xOff = width / this.x
      this.yOff = height / this.y
      
      this.values=[]
      
      // this.values=[5,1,0,7,1,8,0,2,7,9,9,2,5,7,4,6,8,4,2,3,6,0,0,6,1,1,6,7,3,9,0,0,4,7,7,1,0,2,2,1,5,0,5,8,0,4,1,3,8,8,9,8,9,2,4,6,5,3,1,4,0,5,6,5,9,6,3,6,5,0,5,1,7,4,5,5,1,7,2,8,0,8,5,8,6,2,9,0,4,1,2,4,8,7,8,8,0,2,3,9]
      
      this.arrayOfRows=[]
      for (var i=0; i<_y; i++){
        var row=[]
        for (var j=0; j<_x; j++){
          row.push(this.values[j+i*_y])
        }
        this.arrayOfRows.push(row)
      }
    }
    
    
    drawGrid(){
      for(let j=0; j <= this.y; j++){
        for (let i=0; i<=this.x; i++){
          rect(this.posX, this.posY, this.xOff, this.yOff)
          this.posX += this.xOff
          if (this.posX > this.x * this.xOff) {this.posX = 0}
        }
        this.posY = this.posY+this.yOff
      }
    }
    
    setValues(){
      for (var i = 0; i < (this.x * this.y); i++){
       this.values.push(floor(random(10))) 
      }
      // print('Values:',this.values)
      var xOff=this.xOff/2;
      var xReset=xOff
      var yOff = this.yOff/2;
      for (const i in this.values){
        textSize(this.xOff/3);
        textAlign(CENTER);
        if (this.values[i]==9) {
          fill(255,0,0)
        }
        text(this.values[i],xOff,yOff)
        fill(0)
        xOff += this.xOff
        if (xOff > width){
          xOff = xReset
          yOff += this.yOff
        }
      }
    }
    
    analyze(x,y){
      // print('Array of rows:', this.arrayOfRows)
      var currentNode = x+y*this.y // [array_index]
      console.log("initial pick: ",this.values[currentNode])
      
      var queue = [currentNode]
      var visited = new Array(this.values.length).fill(false)
      
      while (queue.length != 0){
        var node = queue.shift()
        var xPos = node%this.x
        var yPos = Math.floor(node/this.y)
        
        // print('node', this.values[node],'node index:',node)
        fill(0,255,0,20)
        rect(xPos*this.xOff,yPos*this.yOff,this.xOff,this.yOff)
  
        visited[node]=true
        
        // add left neighbour 
        var left = node-1
        if ( xPos-1>=0 & !visited[left] & this.values[left]!=9){
          queue.push(left)
          visited[left]=true
        }
        // add right neighbour 
        var right = node+1
        if ( xPos+1 < this.arrayOfRows[0].length & !visited[right] & this.values[right]!=9){
          queue.push(right)
          visited[right]=true
        }      
        
        // add bottom neighbour
        var bottom = node + this.y
        if (yPos+1<this.arrayOfRows.length & !visited[bottom] & this.values[bottom]!=9){
          queue.push(bottom)
          visited[bottom]=true
        }
        
        // add top neighbour
        var top = node - this.y
        if (yPos-1 >= 0 & !visited[top] & this.values[top]!=9){
          queue.push(top)
          visited[top]=true
        }
      }
    }
  
  }
  