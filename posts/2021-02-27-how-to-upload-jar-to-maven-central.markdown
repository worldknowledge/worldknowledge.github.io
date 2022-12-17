---
permalink: maven/how-to-upload-jar-to-maven-central
layout: post
title: Upload JAR file to Maven Central
excerpt: 'In this article, I will share with you how I have uploaded my first JAR file to Maven Central'
tags:
  - java
  - maven
keywords:
  - upload jar file
  - publish jar file
  - maven central
category: maven
---

Uploading a JAR file to the Maven central repository makes it available to anyone using Maven to manage dependencies for their Java project.
And here are the steps that went through to upload my first JAR:

1. [Create a JIRA account](https://issues.sonatype.org/secure/Signup!default.jspa)
2. [Create a New Project ticket](https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134)
   ![create-new-project-ticket.png](/assets/how-to-upload-jar-to-maven-central/create-new-project-ticket.png)

3. [Install **GnuPG** and generate key pair](https://central.sonatype.org/pages/working-with-pgp-signatures.html) to sign the files to upload
   In this guide, the distribution method may take a while

   ```
   gpg --keyserver hkp://pool.sks-keyservers.net --send-keys C6EED57A
   ```

   To accelerate a little a bit this process, we can export our public key using this command

   ```
   gpg --export -a --output myname-key.asc my@email.address
   ```

   and upload it using the [GPG Key Server](https://keyserver.ubuntu.com/)

4. Create a maven project

   Here my **hello-world** project

   <p class="code-tabs"></p>

   - pom.xml

     ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
       <modelVersion>4.0.0</modelVersion>

       <groupId>com.github.ahenteti</groupId>
       <artifactId>hello-maven</artifactId>
       <version>1.0</version>

       <name>${project.groupId}:${project.artifactId}</name>
       <description>A hello-world maven library</description>
       <url>https://github.com/ahenteti/hello-maven</url>

       <properties>
         <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
         <maven.compiler.source>1.8</maven.compiler.source>
         <maven.compiler.target>1.8</maven.compiler.target>
         <junit.version>4.11</junit.version>
         <maven-source-plugin.version>2.2.1</maven-source-plugin.version>
         <maven-javadoc-plugin.version>2.9.1</maven-javadoc-plugin.version>
         <maven-gpg-plugin.version>1.5</maven-gpg-plugin.version>
       </properties>

       <licenses>
         <license>
           <name>The Apache License, Version 2.0</name>
           <url>http://www.apache.org/licenses/LICENSE-2.0.txt</url>
         </license>
       </licenses>

       <developers>
         <developer>
           <name>Ahmed HENTETI</name>
           <email>ahmad.henteti@gmail.com</email>
           <organization>com.github.ahenteti</organization>
           <organizationUrl>https://github.com/ahenteti/hello-maven</organizationUrl>
         </developer>
       </developers>

       <scm>
         <connection>scm:git:git://github.com/ahenteti/hello-maven.git</connection>
         <developerConnection>scm:git:ssh://github.com:ahenteti/hello-maven.git</developerConnection>
         <url>https://github.com/ahenteti/hello-maven</url>
       </scm>

       <distributionManagement>
         <snapshotRepository>
           <id>ossrh</id>
           <url>https://s01.oss.sonatype.org/content/repositories/snapshots</url>
         </snapshotRepository>
         <repository>
           <id>ossrh</id>
           <url>https://s01.oss.sonatype.org/service/local/staging/deploy/maven2</url>
         </repository>
       </distributionManagement>

       <dependencies>
         <dependency>
           <groupId>junit</groupId>
           <artifactId>junit</artifactId>
           <version>${junit.version}</version>
           <scope>test</scope>
         </dependency>
       </dependencies>

       <build>
         <plugins>
           <plugin>
             <groupId>org.apache.maven.plugins</groupId>
             <artifactId>maven-source-plugin</artifactId>
             <version>${maven-source-plugin.version}</version>
             <executions>
               <execution>
                 <id>attach-sources</id>
                 <goals>
                   <goal>jar-no-fork</goal>
                 </goals>
               </execution>
             </executions>
           </plugin>

           <plugin>
             <groupId>org.apache.maven.plugins</groupId>
             <artifactId>maven-javadoc-plugin</artifactId>
             <version>${maven-javadoc-plugin.version}</version>
             <executions>
               <execution>
                 <id>attach-javadocs</id>
                 <goals>
                   <goal>jar</goal>
                 </goals>
               </execution>
             </executions>
           </plugin>

           <plugin>
             <groupId>org.apache.maven.plugins</groupId>
             <artifactId>maven-gpg-plugin</artifactId>
             <version>${maven-gpg-plugin.version}</version>
             <executions>
               <execution>
                 <id>sign-artifacts</id>
                 <phase>verify</phase>
                 <goals>
                   <goal>sign</goal>
                 </goals>
               </execution>
             </executions>
           </plugin>
         </plugins>
       </build>

     </project>
     ```

   - HelloMaven.java

     ```java
     package com.github.ahenteti.hellomaven;

     public class HelloMaven {

         public static void hello() {
             System.out.println("Hello Maven Central Repository!");
         }
     }
     ```

5. Deploy your JAR to [OSSRH](https://s01.oss.sonatype.org/#stagingRepositories) using this command `mvn clean deploy`
   ![staging-repositories.png](/assets/how-to-upload-jar-to-maven-central/staging-repositories.png)

6. [Release to the Central Repository](https://central.sonatype.org/pages/releasing-the-deployment.html)

<br/>

Voilà, after a few moments, you can find your JAR in [Maven Central](https://search.maven.org/) :)
![maven-repo.png](/assets/how-to-upload-jar-to-maven-central/maven-repo.png)

I hope you find it useful
