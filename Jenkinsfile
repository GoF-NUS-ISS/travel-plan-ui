pipeline{
    agent { dockerfile true }
  
  stages{
     stage('Checkout SCM'){
    	steps{
           echo 'Branch Name: $GIT_BRANCH'
	}	
    }
    
    stage('Docker Build'){
      steps {
        sh (script: 'docker images -a')
      }
    }
    
  }

}
