pipeline{
    agent any
  
  stages{
     stage('BranchName'){
    	steps{
           echo "$GIT_BRANCH"
	}	
    }
    
    stage('Build Docker Image'){
      steps {
        sh (script: 'docker images -a')
	sh (script: 'docker build -t 333743/travel-plan-api:v1 .')
	sh (script: 'docker images -a')
      }
    }
    stage('Run App'){
      steps {
	sh (script: 'docker run -d -p 4200:4200 333743/travel-plan-api:v1')
      }
    }

    stage('Checkout Test Repo'){
      steps {
	git credentialsId: 'akt-id', url: 'https://github.com/GoF-NUS-ISS/travel-plan-qa.git'
      }
    }
    stage('Execute UI Tests'){
      steps {
	sh (script: 'mvn clean test -Prun-ui')
      }
    }
    
  }

}
