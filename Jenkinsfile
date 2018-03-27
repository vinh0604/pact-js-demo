pipeline {
  agent {
    node {
      label 'Node test'
    }
    
  }
  stages {
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Publish Pacts') {
      steps {
        sh 'npm run publishPacts'
      }
    }
  }
  environment {
    PACT_BROKER_URL = 'http://broker_app'
  }
}