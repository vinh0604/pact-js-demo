pipeline {
  agent any
  stages {
    stage('Lint') {
      steps {
        sh 'npm lint'
      }
    }
    stage('Unit Test') {
      steps {
        sh 'npm run unitTest'
      }
    }
    stage('Integration Test') {
      steps {
        sh 'npm run integrationTest'
      }
    }
    stage('Publish Pact') {
      steps {
        sh 'npm run publishPacts'
      }
    }
  }
}