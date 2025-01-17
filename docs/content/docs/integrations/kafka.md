---
title: Kafka
main_menu: true
card: 
  name: hooks
---

The Kafka Integration is a Self-Service integration that can be configured on a CDS Project.

This integration enables the [Kafka Hook feature]({{<relref "/docs/concepts/workflow/hooks/kafka-hook.md">}}):

## Configure with WebUI

You can add a Kafka Integration on your CDS Project.

![Integration](../images/kafka-integration-webui.png)

## Configure with cdsctl

### Import a Kafka Integration on your CDS Project

Create a file project-configuration.yml:

```yml
name: your-kafka-integration
model:
  name: Kafka
  identifier: github.com/ovh/cds/integration/builtin/kafka
  hook: true
config:
  broker url:
    value: n1.o1.your-broker:9093,n2.o1.n1.o1.your-broker:9093,n3.o1.n1.o1.your-broker:9093
    type: string
  password:
    value: '**********'
    type: password
  username:
    value: kafka-username
    type: string
```

Import the integration on your CDS Project with:

```bash
cdsctl project integration import PROJECT_KEY project-configuration.yml
```

Then, as a standard user, you can add a [Kafka Hook]({{<relref "/docs/concepts/workflow/hooks/kafka-hook.md">}}) on your workflow.


### Create a Public Kafka Integration for whole CDS Projects

You can also add a Kafka Integration with cdsctl. As a CDS Administrator,
this allows you to propose a Public Kafka Integration, available on all CDS Projects.

Create a file public-configuration.yml:

```yml
name: your-kafka-integration
hook: true
public: true
public_configurations:
  name-of-integration:
    "broker url":
      type: string
      value: "n1.o1.your-broker:9093,n2.o1.n1.o1.your-broker:9093,n3.o1.n1.o1.your-broker:9093"
    "topic":
      type: string
      value: "your-topic.events"
    "username":
      type: string
      value: "your-topic.cds-reader"
    "password":
      type: password
      value: xxxxxxxx
```

Import the integration with :

```bash
cdsctl admin integration-model import public-configuration.yml
```

Then, as a standard user, you can add a [Kafka Hook]({{<relref "/docs/concepts/workflow/hooks/kafka-hook.md">}}) on your workflow.

### Add Kafka to handle CDS events

If you want to trigger something following an event in CDS you can add a kafka event integration. You have 2 options :

+ If you are a CDS administrator, you can add a public kafka event integration with `event: true` in your yaml file. When an event integration is public then all CDS events are send to this kafka topic.

+ You are a CDS user and want to plug your own kafka topic for one or several of your workflows. You just have to add your personal kafka event integration and add it to your workflow in the `notifications` tab on UI. An example of use case could be that you want to generate some svg badge for a specific workflow and not all. Then you can just add an event integration for your workflow and plug the [badge microservice](https://github.com/ovh/cds/tree/master/contrib/uservices/badge) on this kafka topic.

Example of yaml configuration:

```yml
name: your-kafka-integration
hook: true
event: true
public_configurations:
  name-of-integration:
    "broker url":
      type: string
      value: "n1.o1.your-broker:9093,n2.o1.n1.o1.your-broker:9093,n3.o1.n1.o1.your-broker:9093"
    "topic":
      type: string
      value: "your-topic.events"
    "username":
      type: string
      value: "your-topic.cds-reader"
    "password":
      type: password
      value: xxxxxxxx
```
