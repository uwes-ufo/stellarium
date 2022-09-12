#version 330



#line 1 1 // version.h.glsl
#ifndef INCLUDE_ONCE_EF4160B0_E881_42C8_BB48_A408AF2E4354
#define INCLUDE_ONCE_EF4160B0_E881_42C8_BB48_A408AF2E4354

#extension GL_ARB_shading_language_420pack : enable
#ifdef GL_ARB_shading_language_420pack
# define CONST const
#else
# define CONST
#endif

#endif
#line 6 0 // compute-eclipsed-single-scattering.frag
#line 1 2 // const.h.glsl
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
const vec4 scatteringCrossSection_molecules=vec4(2.39459446e-30,1.71496275e-30,1.26023066e-30,9.46713716e-31);
const vec4 scatteringCrossSection_aerosols=vec4(4.29679994e-14,4.29679994e-14,4.29679994e-14,4.29679994e-14);
const vec4 groundAlbedo=vec4(0.0350000001,0.0370000005,0.0399999991,0.0410000011);
const vec4 solarIrradianceAtTOA=vec4(1.03699994,1.24899995,1.68400002,1.97500002);
const vec4 lightPollutionRelativeRadiance=vec4(0,0,4.3e-07,1.623e-06);
const vec4 wavelengths=vec4(360,391.333344,422.666656,454);
const int wlSetIndex=0;
#endif
#line 7 0 // compute-eclipsed-single-scattering.frag
#line 1 3 // texture-coordinates.h.glsl
#ifndef INCLUDE_ONCE_72E237D7_42B6_462B_90E4_73AB6B6E4DE4
#define INCLUDE_ONCE_72E237D7_42B6_462B_90E4_73AB6B6E4DE4

float texCoordToUnitRange(const float texCoord, const float texSize);
float unitRangeToTexCoord(const float u, const float texSize);
struct TransmittanceTexVars
{
    float cosViewZenithAngle;
    float altitude;
};
TransmittanceTexVars transmittanceTexCoordToTexVars(const vec2 texCoord);
vec2 transmittanceTexVarsToTexCoord(const float cosVZA, float altitude);
struct IrradianceTexVars
{
    float cosSunZenithAngle;
    float altitude;
};
IrradianceTexVars irradianceTexCoordToTexVars(const vec2 texCoord);
vec2 irradianceTexVarsToTexCoord(const float cosSunZenithAngle, const float altitude);

struct ScatteringTexVars
{
    float cosSunZenithAngle;
    float cosViewZenithAngle;
    float dotViewSun;
    float altitude;
    bool viewRayIntersectsGround;
};
ScatteringTexVars scatteringTexIndicesToTexVars(const vec3 texIndices);
vec4 sample4DTexture(const sampler3D tex, const float cosSunZenithAngle, const float cosViewZenithAngle,
                     const float dotViewSun, const float altitude, const bool viewRayIntersectsGround);
vec4 sample3DTexture(const sampler3D tex, const float cosSunZenithAngle, const float cosViewZenithAngle,
                     const float dotViewSun, const float altitude, const bool viewRayIntersectsGround);
vec4 sample3DTextureGuided(const sampler3D tex,
                           const sampler3D interpolationGuides01Tex, const sampler3D interpolationGuides02Tex,
                           const float cosSunZenithAngle, const float cosViewZenithAngle,
                           const float dotViewSun, const float altitude, const bool viewRayIntersectsGround);

struct EclipseScatteringTexVars
{
    float azimuthRelativeToSun;
    float cosViewZenithAngle;
    bool viewRayIntersectsGround;
};
EclipseScatteringTexVars eclipseTexCoordsToTexVars(const vec2 texCoords, const float altitude);
vec2 eclipseTexVarsToTexCoords(const float azimuthRelativeToSun, const float cosViewZenithAngle,
                               const float altitude, const bool viewRayIntersectsGround,
                               const vec2 texSize);

vec4 sampleEclipseDoubleScattering3DTexture(const sampler3D tex, const float cosSunZenithAngle,
                                            const float cosViewZenithAngle, const float azimuthRelativeToSun,
                                            const float altitude, const bool viewRayIntersectsGround);

struct LightPollution2DCoords
{
    float cosViewZenithAngle;
    float altitude;
};
struct LightPollutionTexVars
{
    float altitude;
    float cosViewZenithAngle;
    bool viewRayIntersectsGround;
};
LightPollutionTexVars scatteringTexIndicesToLightPollutionTexVars(const vec2 texIndices);
vec2 lightPollutionTexVarsToTexCoords(const float altitude, const float cosViewZenithAngle, const bool viewRayIntersectsGround);

#endif
#line 8 0 // compute-eclipsed-single-scattering.frag
#line 1 4 // radiance-to-luminance.h.glsl
const mat4 radianceToLuminance=mat4(1.38997746,0.0419133306,6.48549128,0,  105.968163,3.00652099,500.960266,142.641495,  3776.24023,119.971481,18207.7598,6412.0166,  6910.01318,981.06665,37504.0586,26741.9102);
#line 9 0 // compute-eclipsed-single-scattering.frag
#line 1 5 // single-scattering-eclipsed.h.glsl
#ifndef INCLUDE_ONCE_050024D2_BD56_434E_8D40_2055DA0B78EC
#define INCLUDE_ONCE_050024D2_BD56_434E_8D40_2055DA0B78EC

vec4 computeSingleScatteringEclipsed(const vec3 camera, const vec3 viewDir, const vec3 sunDir, const vec3 moonDir,
                                     const bool viewRayIntersectsGround);

#endif
#line 10 0 // compute-eclipsed-single-scattering.frag

in vec3 position;
out vec4 scatteringTextureOutput;

uniform float altitude;
uniform float sunZenithAngle;
uniform vec3 moonPositionRelativeToSunAzimuth;

vec4 solarRadiance()
{
    return solarIrradianceAtTOA/(PI*sqr(sunAngularRadius));
}

void main()
{
    CONST EclipseScatteringTexVars texVars=eclipseTexCoordsToTexVars(gl_FragCoord.xy/eclipsedSingleScatteringTextureSize, altitude);
    CONST float sinViewZenithAngle=sqrt(1-sqr(texVars.cosViewZenithAngle));
    CONST vec3 viewDir=vec3(cos(texVars.azimuthRelativeToSun)*sinViewZenithAngle,
                            sin(texVars.azimuthRelativeToSun)*sinViewZenithAngle,
                            texVars.cosViewZenithAngle);
    CONST vec3 cameraPosition=vec3(0,0,altitude);
    CONST vec3 sunDirection=vec3(sin(sunZenithAngle), 0, cos(sunZenithAngle));
    CONST vec4 radiance=computeSingleScatteringEclipsed(cameraPosition,viewDir,sunDirection,moonPositionRelativeToSunAzimuth,
                                                        texVars.viewRayIntersectsGround);
#if 0 /*COMPUTE_RADIANCE*/
    scatteringTextureOutput=radiance;
#elif 1 /*COMPUTE_LUMINANCE*/
    scatteringTextureOutput=radianceToLuminance*radiance;
#else
#error What to compute?
#endif
}
