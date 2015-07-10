<?xml version="1.0" encoding="utf-8"?>
<serviceModel xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="OurMatesCloudServices" generation="1" functional="0" release="0" Id="de585a14-74c9-4cd5-ac5c-85583f6b199b" dslVersion="1.2.0.0" xmlns="http://schemas.microsoft.com/dsltools/RDSM">
  <groups>
    <group name="OurMatesCloudServicesGroup" generation="1" functional="0" release="0">
      <componentports>
        <inPort name="OurMates:Endpoint1" protocol="http">
          <inToChannel>
            <lBChannelMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/LB:OurMates:Endpoint1" />
          </inToChannel>
        </inPort>
      </componentports>
      <settings>
        <aCS name="OurMates:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="">
          <maps>
            <mapMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/MapOurMates:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </maps>
        </aCS>
        <aCS name="OurMatesInstances" defaultValue="[1,1,1]">
          <maps>
            <mapMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/MapOurMatesInstances" />
          </maps>
        </aCS>
      </settings>
      <channels>
        <lBChannel name="LB:OurMates:Endpoint1">
          <toPorts>
            <inPortMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMates/Endpoint1" />
          </toPorts>
        </lBChannel>
      </channels>
      <maps>
        <map name="MapOurMates:Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" kind="Identity">
          <setting>
            <aCSMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMates/Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" />
          </setting>
        </map>
        <map name="MapOurMatesInstances" kind="Identity">
          <setting>
            <sCSPolicyIDMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMatesInstances" />
          </setting>
        </map>
      </maps>
      <components>
        <groupHascomponents>
          <role name="OurMates" generation="1" functional="0" release="0" software="D:\Task\Mates\src\mates\OurMates\OurMatesCloudServices\csx\Debug\roles\OurMates" entryPoint="base\x64\WaHostBootstrapper.exe" parameters="base\x64\WaIISHost.exe " memIndex="-1" hostingEnvironment="frontendadmin" hostingEnvironmentVersion="2">
            <componentports>
              <inPort name="Endpoint1" protocol="http" portRanges="80" />
            </componentports>
            <settings>
              <aCS name="Microsoft.WindowsAzure.Plugins.Diagnostics.ConnectionString" defaultValue="" />
              <aCS name="__ModelData" defaultValue="&lt;m role=&quot;OurMates&quot; xmlns=&quot;urn:azure:m:v1&quot;&gt;&lt;r name=&quot;OurMates&quot;&gt;&lt;e name=&quot;Endpoint1&quot; /&gt;&lt;/r&gt;&lt;/m&gt;" />
            </settings>
            <resourcereferences>
              <resourceReference name="DiagnosticStore" defaultAmount="[4096,4096,4096]" defaultSticky="true" kind="Directory" />
              <resourceReference name="EventStore" defaultAmount="[1000,1000,1000]" defaultSticky="false" kind="LogStore" />
            </resourcereferences>
          </role>
          <sCSPolicy>
            <sCSPolicyIDMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMatesInstances" />
            <sCSPolicyUpdateDomainMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMatesUpgradeDomains" />
            <sCSPolicyFaultDomainMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMatesFaultDomains" />
          </sCSPolicy>
        </groupHascomponents>
      </components>
      <sCSPolicy>
        <sCSPolicyUpdateDomain name="OurMatesUpgradeDomains" defaultPolicy="[5,5,5]" />
        <sCSPolicyFaultDomain name="OurMatesFaultDomains" defaultPolicy="[2,2,2]" />
        <sCSPolicyID name="OurMatesInstances" defaultPolicy="[1,1,1]" />
      </sCSPolicy>
    </group>
  </groups>
  <implements>
    <implementation Id="f67829a6-8692-437e-af01-7eeea18d0b97" ref="Microsoft.RedDog.Contract\ServiceContract\OurMatesCloudServicesContract@ServiceDefinition">
      <interfacereferences>
        <interfaceReference Id="1deae3f2-943f-4fb6-88ce-505867267e8b" ref="Microsoft.RedDog.Contract\Interface\OurMates:Endpoint1@ServiceDefinition">
          <inPort>
            <inPortMoniker name="/OurMatesCloudServices/OurMatesCloudServicesGroup/OurMates:Endpoint1" />
          </inPort>
        </interfaceReference>
      </interfacereferences>
    </implementation>
  </implements>
</serviceModel>