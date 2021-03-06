'use strict';
/* eslint-env node, mocha */
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var os = require('os');
var path = require('path');

describe('generator-alfresco:behavior', function () {
  this.timeout(60000);
  var osTempDir = path.join(os.tmpdir(), 'temp-test');

  describe('with simple 2.1.1 project', function () {
    before(function () {
      return helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(osTempDir)
        .withOptions({'skip-install': true})
        .withPrompts({
          sdkVersion: '2.1.1',
          projectArtifactId: 'temp-test',
          removeDefaultSourceAmps: false,
          removeDefaultSourceSamples: false,
        })
        .toPromise();
    });

    describe('when creating behavior with two word name', function () {
      var behaviorFile = path.join(osTempDir, 'repo-amp/src/main/java/org/alfresco/behaviors/TwoWords.java');
      var contextFile = path.join(osTempDir, 'repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/generated/behavior-two-words-context.xml');

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/behavior'))
          // generator will create a temp directory and make sure it's empty
          .inTmpDir(function () {
            // HACK: we want our test to run inside the previously generated
            // directory and we don't want it to be empty, so this is a hack
            // for that.
            process.chdir(osTempDir);
          })
          .withOptions({
            'class': 'two words',
            'package': 'org.alfresco.behaviors',
          })
          .toPromise();
      });

      it('creates appropriate behavior files', function () {
        assert.file([
          behaviorFile,
          contextFile,
        ]);
      });

      it('has valid content in behavior class', function () {
        assert.fileContent([
          [behaviorFile, /package org\.alfresco\.behaviors/],
          [behaviorFile, /class TwoWords implements InitializingBean/],
          [behaviorFile, /LogFactory\.getLog\(TwoWords.class\)/],
          [behaviorFile, /TwoWords working on properties update for node/],
        ]);
      });

      it('has valid content in context file', function () {
        assert.fileContent([
          [contextFile, /<bean id="repo-amp.two-words"/],
          [contextFile, /class="org.alfresco.behaviors.TwoWords/],
        ]);
      });
    });

    describe('when creating behavior with CamelCase class', function () {
      var behaviorFile = path.join(osTempDir, 'repo-amp/src/main/java/org/alfresco/behaviors/CamelCase.java');
      var contextFile = path.join(osTempDir, 'repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/generated/behavior-camel-case-context.xml');

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/behavior'))
          // generator will create a temp directory and make sure it's empty
          .inTmpDir(function () {
            // HACK: we want our test to run inside the previously generated
            // directory and we don't want it to be empty, so this is a hack
            // for that.
            process.chdir(osTempDir);
          })
          .withOptions({
            'class': 'CamelCase',
            'package': 'org.alfresco.behaviors',
          })
          .toPromise();
      });

      it('creates appropriate behavior files', function () {
        assert.file([
          behaviorFile,
          contextFile,
        ]);
      });

      it('has valid content in behavior class', function () {
        assert.fileContent([
          [behaviorFile, /package org\.alfresco\.behaviors/],
          [behaviorFile, /class CamelCase implements InitializingBean/],
          [behaviorFile, /LogFactory\.getLog\(CamelCase.class\)/],
          [behaviorFile, /CamelCase working on properties update for node/],
        ]);
      });

      it('has valid content in context file', function () {
        assert.fileContent([
          [contextFile, /<bean id="repo-amp.camel-case"/],
          [contextFile, /class="org.alfresco.behaviors.CamelCase/],
        ]);
      });
    });

    describe('when creating behavior using package that does not end with .behaviors', function () {
      var behaviorFile = path.join(osTempDir, 'repo-amp/src/main/java/org/alfresco/behaviors/Test.java');
      var contextFile = path.join(osTempDir, 'repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/generated/behavior-test-context.xml');

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/behavior'))
          // generator will create a temp directory and make sure it's empty
          .inTmpDir(function () {
            // HACK: we want our test to run inside the previously generated
            // directory and we don't want it to be empty, so this is a hack
            // for that.
            process.chdir(osTempDir);
          })
          .withOptions({
            'class': 'test',
            'package': 'org.alfresco',
          })
          .toPromise();
      });

      it('creates appropriate behavior files', function () {
        assert.file([
          behaviorFile,
          contextFile,
        ]);
      });

      it('has valid content in behavior class', function () {
        assert.fileContent([
          [behaviorFile, /package org\.alfresco\.behaviors/],
          [behaviorFile, /class Test implements InitializingBean/],
          [behaviorFile, /LogFactory\.getLog\(Test.class\)/],
          [behaviorFile, /Test working on properties update for node/],
        ]);
      });

      it('has valid content in context file', function () {
        assert.fileContent([
          [contextFile, /<bean id="repo-amp.test"/],
          [contextFile, /class="org.alfresco.behaviors.Test/],
        ]);
      });
    });

    describe('when creating behaviors with prompts', function () {
      var behaviorFile = path.join(osTempDir, 'repo-amp/src/main/java/org/alfresco/behaviors/Prompts.java');
      var contextFile = path.join(osTempDir, 'repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/generated/behavior-prompts-context.xml');

      before(function () {
        return helpers.run(path.join(__dirname, '../generators/behavior'))
          // generator will create a temp directory and make sure it's empty
          .inTmpDir(function () {
            // HACK: we want our test to run inside the previously generated
            // directory and we don't want it to be empty, so this is a hack
            // for that.
            process.chdir(osTempDir);
          })
          .withPrompts({
            'class': 'prompts',
            'package': 'org.alfresco.behaviors',
          })
          .toPromise();
      });

      it('creates appropriate behavior files', function () {
        assert.file([
          behaviorFile,
          contextFile,
        ]);
      });

      it('has valid content in behavior class', function () {
        assert.fileContent([
          [behaviorFile, /package org\.alfresco\.behaviors/],
          [behaviorFile, /class Prompts implements InitializingBean/],
          [behaviorFile, /LogFactory\.getLog\(Prompts.class\)/],
          [behaviorFile, /Prompts working on properties update for node/],
        ]);
      });

      it('has valid content in context file', function () {
        assert.fileContent([
          [contextFile, /<bean id="repo-amp.prompts"/],
          [contextFile, /class="org.alfresco.behaviors.Prompts/],
        ]);
      });
    });
  });

  describe('when creating behavior when there is no project', function () {
    var noProjectTempDir = path.join(os.tmpdir(), 'no-project');

    before(function () {
      return helpers.run(path.join(__dirname, '../generators/behavior'))
        .inDir(noProjectTempDir)
        // generator will create a temp directory and make sure it's empty
        .withOptions({
          'class': 'no-project',
          'package': 'org.alfresco.behaviors',
        })
        .toPromise();
    });

    it('does not create action files', function () {
      var behaviorFile = path.join(noProjectTempDir, 'repo-amp/src/main/java/org/alfresco/behaviors/NoProject.java');
      var contextFile = path.join(noProjectTempDir, 'repo-amp/src/main/amp/config/alfresco/module/repo-amp/context/generated/behavior-no-project-context.xml');
      assert.noFile([
        behaviorFile,
        contextFile,
      ]);
    });
  });
});

// vim: autoindent expandtab tabstop=2 shiftwidth=2 softtabstop=2
