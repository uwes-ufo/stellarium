#version 330
#extension GL_ARB_shading_language_420pack : require

#line 1 1 // const.h.glsl
#ifndef INCLUDE_ONCE_2B59AE86_E78B_4D75_ACDF_5DA644F8E9A3
#define INCLUDE_ONCE_2B59AE86_E78B_4D75_ACDF_5DA644F8E9A3
const float earthRadius=6.371e+06; // must be in meters
const float atmosphereHeight=120000; // must be in meters

const vec3 earthCenter=vec3(0,0,-earthRadius);

const float dobsonUnit = 2.687e20; // molecules/m^2
const float PI=3.1415926535897932;
const float km=1000;
#define sqr(x) ((x)*(x))

uniform float sunAngularRadius=0.00459925318;
const float moonRadius=1737100;
const vec4 scatteringTextureSize=vec4(128,8,32,32);
const vec2 irradianceTextureSize=vec2(64,16);
const vec2 transmittanceTextureSize=vec2(256,64);
const vec2 eclipsedSingleScatteringTextureSize=vec2(32,128);
const vec2 lightPollutionTextureSize=vec2(128,64);
const int radialIntegrationPoints=50;
const int angularIntegrationPoints=512;
const int lightPollutionAngularIntegrationPoints=200;
const int eclipseAngularIntegrationPoints=512;
const int numTransmittanceIntegrationPoints=500;
const vec4 scatteringCrossSection_molecules=vec4(1.37066344e-31,1.16012782e-31,9.88507054e-32,8.47480528e-32);
const vec4 scatteringCrossSection_aerosols=vec4(4.29679994e-14,4.29679994e-14,4.29679994e-14,4.29679994e-14);
const vec4 groundAlbedo=vec4(0.367000014,0.467999995,0.48300001,0.490999997);
const vec4 solarIrradianceAtTOA=vec4(1.30900002,1.23000002,1.14199996,1.06200004);
const vec4 lightPollutionRelativeRadiance=vec4(3.80500001e-06,4.31499984e-06,4.95599988e-06,3.00800002e-05);
const vec4 wavelengths=vec4(736,767.333313,798.666687,830);
const int wlSetIndex=3;
#endif
#line 5 0 // phase-functions.frag

vec4 phaseFunction_molecules(float dotViewSun)
{
        return vec4(3./(16*PI)*(1+sqr(dotViewSun)));
}
vec4 phaseFunction_aerosols(float dotViewSun)
{
        const float g=0.76;
        const float g2=g*g;
        const float k = 3/(8*PI)*(1-g2)/(2+g2);
        return vec4(k * (1+sqr(dotViewSun)) / pow(1+g2 - 2*g*dotViewSun, 1.5) + 1/((1-dotViewSun)*600+0.05))*0.904;
}
