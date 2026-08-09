---
title: "Honeypot - Analyzing ICS Threats"
subtitle: "Using Conpot to analyze adversarial ICS traffic"
layout: post
category: "project"
image_source: "/assets/img/posts/honeypot1/Thumbnail.png"
date: 2025-05-16
---

*This report is the result of the final project for my university's Cyber Physical Systems class. My groupmates ([Arica Willis](https://www.linkedin.com/in/arica-willis) and [Julia Miller](https://www.linkedin.com/in/julia-miller-81a8a3329/)) and I utilized [conpot](http://conpot.org) and [T-Pot](https://github.com/telekom-security/tpotce/issues) to create a simple industrial control system (ICS) honeypot and observed it for some time. The following is our resulting report. I hope to create more complicated and comprehensive honeypots in the future.*
<br><br>
<br><br>
## **Analyzing Real-World Threats to Industrial Control Systems**  
**Prepared by: Julia Miller, Jada Cumberland, Arica Willis**

**22 April 2025**

<br><br>
# **Introduction** 

Technology plays a pivotal role in modern society, deeply embedded in virtually every sector, including the systems that support our daily lives. Critical infrastructure, such as water treatment plants, transportation networks, and energy pipelines, is especially reliant on technological innovation. These infrastructures are managed through interconnected devices known as Industrial Control Systems (ICS), which require consistent, specialized software to ensure operational precision and safety.  
Given the high stakes involved, vulnerabilities within ICS environments pose significant national security risks. A single software malfunction in a facility like a water treatment plant can have catastrophic consequences, as demonstrated by the 2021 cyberattack on the Oldsmar, Florida water supply \[3\]. Unlike commercial software, ICS components are often customized and receive fewer security updates, leaving them susceptible to cyber threats, particularly from nation-state actors amidst rising geopolitical tensions.  
This project explored the cybersecurity threats facing industrial control systems, with a focus on understanding the tools, techniques, and procedures (TTPs) used by adversaries. Through our research and analysis, we identified several key vulnerabilities common in ICS environments, evaluated real-world case studies, and reviewed potential mitigation strategies. Our findings emphasize the urgent need for proactive defense measures and improved threat intelligence to secure critical infrastructure against evolving cyber threats.

<br><br>
# **Design Methodology**

To accomplish the goal of this project, there were several base-level considerations to keep in mind. Most important among these were funding and time. As college students, we did not have the funds to build a large, distributed honeypot network, nor did we have the time to dedicate to creating our own from scratch. The project was built with four technological layers: a Virtual Private Server (VPS), the Operating System (OS), the honeypot framework, and the honeypot itself.   
The VPS was the backbone upon which the rest of the project was built. Linode was chosen because it was cost-effective and easy to set up, thanks to its shared-CPU infrastructure. It simulated a server with the following specifications: 8 GB RAM, 160 GB storage, and 4 CPU Cores shared with other allocations. The server was hosted in Atlanta, GA. Upon provisioning this VPS, the first step was to create separate accounts with secure passwords for each member of the team. This enabled multiple people to work on the project at once without sharing account details.  
As some team members had experience with Ubuntu Server 24.04, that was selected as the OS. While installation was made simple by Linode, there were some additional steps taken to secure and harden the server instance. The first step was creating a secure password for the root user. After, a Linux account with a strong, unique password was created for each team member using the *adduser* command. Each account was added to the sudoers group to ensure it had the same capabilities and permissions as a *root* user. This, again, allowed for all team members to interact with the project at the same time without sharing an account. Several other steps were taken, including adding an asymmetric Secure Shell (SSH) key for each account to utilize secure remote access and closing all unneeded ports to reduce the attack surface. Finally, all packages were updated/upgraded using the *sudo apt-get update* and *sudo apt-get upgrade* commands. As the goal of a honeypot is to attract malicious attackers, it was essential to protect the underlying infrastructure of the project.  
The next layer of the project, the framework, was installed on top of the Ubuntu Server OS. T-Pot, which is shorthand for the name “Threat Intelligence Pot”, is a framework for honeypots that contains upwards of 20 ready-to-deploy honeypots and various methods of viewing metrics and analytics. It was developed by Telekom Security in 2015 to make honeypot creation less complicated. Installation and basic setup consisted of the following steps: installing Python, downloading T-Pot from the GitHub repository \[1\], and installing it with the provided *install.sh* bash script, and selecting the **HIVE** option when prompted. T-Pot allows for the creation of distributed honeypot networks; while there was no plan to create a complicated setup, every T-Pot must start with a Hive honeypot. Additionally, all honeypots that were unrelated to the project were turned off by commenting them out in the *docker-compose.yaml* file.   
The specific honeypot used in our project is *conpot* \[2\], a honeypot designed to replicate Industrial Control Systems. Conpot was created as an open-source program by a group of developers. It simulates an ICS by running some of the protocols associated with those systems, such as FTP on port 21\.   
By letting this setup run for some time, the team was able to gain insight on attackers of Industrial Control Systems, which will be discussed in the Results & Analysis section.

<br><br>
# **Results & Analysis**

Over the course of the month that the conpot was active, there were around 3000 attacks that occurred. A histogram of these attacks can be viewed below in Figure 1\. This figure shows the number of total attacks and unique attacks that occurred over time. Most of these attacks were not unique, meaning that multiple attacks were happening from the same IP address, which will be discussed further down in the results section.
<br><br>
![][image1]

Figure 1: Attack Histogram
<br><br>
Below in Figure 2, we can see the attack map for locations where these attacks on the Conpot were occurring. Surprisingly, many of these attacks occurred from inside the United States. However, there was still a significant number of attacks that occurred from the Eastern and Northern Hemispheres. Figure 3 shows a pie chart of the number of attacks by each country. This further showcases the surprising fact that \>60% were happening from inside the United States. An important thing to note, however, is that due to technology like VPN, proxies, etc, these statistics are likely slightly skewed than the actual locations of where these attacks might be occurring. 
<br><br>
![][image2]

Figure 2: Attack Map
<br><br>
![][image3]

Figure 3: Attacks by Country
<br><br>
Below, Table 1 showcases the top 6 attackers based on IP address. To summarize these findings, 4/6 of these attackers occurred from, presumably, inside the United States. The top 4 attackers had attacked the Conpot over 100 times in the past month. These attackers' IP addresses were searched using an online database that allows users to report malicious IP addresses, and all of these IP addresses had been reported many times for malicious activity. Specifically, most had been reported for probing and bot activity. The website used to check this was [https://www.abuseipdb.com/](https://www.abuseipdb.com/).
<br><br>

| Source IP | Count | Location | Malicious Activity? |
| :---: | :---: | :---: | :---: |
| 139.144.52.241 | 167 | Georgia, United States | Yes |
| 152.32.247.54 | 118 | Krung Thep Maha, Thailand | Yes |
| 165.22.141.209 | 118 | California, United States | Yes |
| 45.79.194.159 | 118 | Georgia, United States | Yes |
| 45.95.147.229 | 42 | Noord-Holland, Netherlands | Yes |
| 69.164.217.245 | 27 | New Jersey, United States | Yes |

Table 1: Top 6 IP Attacks
<br><br>
Figure 4 allows us to draw even more conclusions about these attackers. This figure outlines the top 5 destination ports that were attacked on the Conpot as well as the day these attacks occurred over time. Table 2 was broken out from this histogram to further elaborate on what these results mean. To summarize the table, most of these ports are typical for ICS. This makes sense in the context of the project since we are replicating an ICS with our Conpot. Ports 1025 and 50100 are typically dynamic ports, but not necessarily ICS-specific. However, port 10001 is used commonly in air control, and port 2404 is used commonly in the electric power industry, which are both very ICS specific. Lastly, port 161 is used for SNMP, which is not ICS specific but useful for gathering data about a system or device, so it makes sense why attackers would aim for it.
<br><br>
![][image4]

Figure 4: Attacks by Destination Port
<br><br>

| Port | Common Use | ICS Specific? |
| :---: | :---: | :---: |
| 1025 | Dynamic ports | No |
| 10001 | Air control  | Yes |
| 2404 | Electric power industry | Yes |
| 50100 | Time-sensitive applications or dynamic port | Possibly |
| 161 | SNMP | Possibly |

Table 2: Destination Port Breakdown
<br><br>
# **Conclusion**

Our team identified several findings from this project. To start, one must learn about adversaries and their tools, techniques, and procedures (TTP) to combat them. Every day, those seeking to harm society using attacks on ICS improve their methods. As such, the defense instilled in these ICS must evolve to match them. This is made difficult by the specialized technologies and embedded systems utilized in these environments. Some organizations and agencies have taken action to make defense easier, however. For example, the US Cybersecurity & Infrastructure Security Agency (CISA) released the Cyber Security Evaluation Tool (CSET) to reduce “the risk to the nation’s critical infrastructure” \[4\] by guiding system owners through detection techniques to understand their assets. It also shows which assets are in compliance with current security standards and which are not. This streamlines the process of enhancing security controls and helps protect the critical infrastructure of our society.

Throughout our project, we observed firsthand how attackers target industrial environments using a mix of automated scanning tools and manually executed exploits. Using a simulated ICS honeypot environment built with Conpot and deployed through the T-Pot framework, we were able to collect data on real-world probing and intrusion attempts. These interactions highlight a persistent interest from adversaries in exploiting services that mimic critical infrastructure systems.

Industrial Control Systems (ICS) face both domestic and international threats. International threats include state-sponsored groups, which target ICS to disrupt critical services or gather information. Domestic threats may stem from insiders or lone actors with access or knowledge of control systems, as seen in the 2021 Oldsmar, Florida water plant incident \[3\]. To defend against both, organizations should implement strict access controls, monitor user behavior, and stay current with advisories from agencies like CISA and industry ISACs.

Attribution of ICS cyber threats is difficult due to the use of VPNs, proxies, and botnets, which attackers employ to hide their true locations. This makes it hard to distinguish between a domestic threat and a foreign adversary. Rather than relying on IP addresses, organizations should use behavioral analytics, deploy honeypots to study attacker methods, and integrate external threat intelligence feeds. Collaborating with national cybersecurity agencies can also improve incident response and attribution accuracy.
<br><br>
# **Closing**

There are a great many cyber threats advancing in sophistication on a daily basis. As it currently stands, our society could be crippled by a single blow to our critical infrastructure. It is important to conduct experiments and research such as this project to better understand our adversaries and improve the defensive mechanisms of our technology into the future.
<br><br>
# **Resources**

\[1\] “telekom-security/tpotce,” GitHub, Dec. 10, 2020\. [https://github.com/telekom-security/tpotce](https://github.com/telekom-security/tpotce)

\[2\] “Conpot,” conpot.org. [http://conpot.org/](http://conpot.org/)

\[3\] A. Greenberg, “A Hacker Tried to Poison a Florida City’s Water Supply,” Wired, Feb. 08, 2021\. [https://www.wired.com/story/oldsmar-florida-water-utility-ha](https://www.wired.com/story/oldsmar-florida-water-utility-hack/)ck/

\[4\] “cisagov/cset,” GitHub, Aug. 31, 2023\. [https://github.com/cisagov/cset](https://github.com/cisagov/cset)


[image1]: /assets/img/posts/honeypot1/Figure1.png
[image2]: /assets/img/posts/honeypot1/Figure2.png
[image3]: /assets/img/posts/honeypot1/Figure3.png
[image4]: /assets/img/posts/honeypot1/Figure4.png
