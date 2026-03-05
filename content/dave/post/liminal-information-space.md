---
draft: true
title: Liminal Information Spaces
description: Exploring the concept of liminal spaces in information architecture.
date: 2026-02-24
tags:
  - liminal
  - information-architecture
  - urn
---

Liminal spaces are creepy for their infinite branching or impossible geometry, relative emptiness, and on the surface level normality but still uncanny feelings.
Can I apply this to information spaces? There are a number of such spaces with delegated hierarchy that seem to go on forever.

[UUIDs](https://datatracker.ietf.org/doc/html/rfc9562) look interesting and have some different forms and versions but the depth is limited and don't inherently represent anything in particular. We can do better.

## URI

Instead let's start with URIs (Uniform Resource Identifiers). URIs have a hierarchical structure that start with a URI scheme that defines how to interpret the rest of the URI. [URI schemes are registered with the IANA](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml).

## URN

URIs are divided into URLs (Uniform Resource Locators) and URNs (Uniform Resource Names).  URNs are used only to identify resources and unlike URLs there is no defined resolution mechanism. The [syntax for URNs](https://datatracker.ietf.org/doc/html/rfc8141#section-2) is roughly `urn:<NID>:...`, where NID is the Namespace Identifier. The NID can be any string that identifies a namespace and [URN namespaces are registered with the IANA](https://www.iana.org/assignments/uri-schemes/uri-schemes.xhtml). 

UUIDs exist in URNs in the form `urn:uuid:<UUID>`. But don't let that distract you.

## OID

An interesting URN namespace is the OID (Object Identifier) namespace. OID is a hierarchical delegating space that is used to identify any sort of entity in a variety of contexts, including likely best known to you in the context of certificates. OIDs are represented as a series of decimal numbers delimited by periods, with each number representing a node in the hierarchy either a specific entity or a namespace that can further delegate its children. The [OID registry is maintained by the ITU-T](https://oid-base.com/). 

UUIDs again look interesting and exist in OIDs in the form `2.25.<UUID>` where UUID is the decimal form of the 128 bit value. But don't let that distract you.

## GS1

Another delegated hierarchical registry found within OID is the GS1. GS1 maintains standards for barcodes (among other related things). They have an OID [2.51](https://oid-base.com/get/2.51) and under that 2.25.1.1 is the GTIN (Global Trade Item Number) namespace. GTINs are used to identify products and are represented as a 14 digit number. The GTIN namespace is further divided into GTIN-8, GTIN-12, and GTIN-13, which are used to identify different types of products.

## ISBN

