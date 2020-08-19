const Webflow = require('webflow-api');
const csv = require('csvtojson');
const util = require('util');

const token = 'ca95ec9d7b801bf432ca6dc394ec9923a3f4adfd80dc3ac9fa327f60e4bd720c';
const webflow = new Webflow({ token });

const portcsv = 'port.csv';
const portDatacsv = 'port-data.csv';

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function processReefer(data) {
  let activePortCode = '';
  let activeLine = '';
  let importExport = '';
  let activeContainer = '';
  let activeSlub = '';
  let freeDays = '';

  let tempContainer = [];
  let demTempContainer = [];

  for (const item of data) {
    if (item.field7 !== '-') {
      if (item.field2 !== '-') {
        activePortCode = item.field2;
      }
      if (item.field3 !== '-') {
        activeLine = item.field3;
      }
      if (item.field4 !== '-') {
        importExport = item.field4.toLowerCase().trim();
        tempContainer = [];
      }
      if (item.field5 !== '-') {
        activeContainer = item.field5;
        if (tempContainer.indexOf(activeContainer.trim()) > -1) {
          tempContainer.push(activeContainer.trim() + ' Reefer');
          item.field5 = activeContainer.trim() + ' Reefer';
        } else {
          tempContainer.push(activeContainer.trim());
        }
      }
      if (item.field6 !== '-') {
        freeDays = item.field6;
      }
      if (item.field7 !== '-') {
        activeSlub = item.field7;
      }
    }

    if (item.field17 !== '-') {
      // start
      if (item.field12 !== '-') {
        dem_activePortCode = item.field12;
      }
      if (item.field13 !== '-') {
        dem_activeLine = item.field13;
      }
      if (item.field14 !== '-') {
        dem_importExport = item.field14.toLowerCase().trim();
        demTempContainer = [];
      }
      if (item.field15 !== '-') {
        dem_activeContainer = item.field15;
        if (demTempContainer.indexOf(dem_activeContainer.trim()) > -1) {
          demTempContainer.push(dem_activeContainer.trim() + ' Reefer');
          item.field15 = dem_activeContainer.trim() + ' Reefer';
        } else {
          demTempContainer.push(dem_activeContainer.trim());
        }
      }
      if (item.field16 !== '-') {
        dem_freeDays = item.field16;
      }
      if (item.field17 !== '-') {
        dem_activeSlub = item.field17;
      }
    }
  }

  return data;
}

(async () => {
  const jsonPorts = await csv().fromFile(portcsv);
  const jsonPortData = await csv().fromFile(portDatacsv);

  const ports = jsonPorts.slice(2);
  const data = processReefer(jsonPortData.slice(1));

  const allPortsData = [];
  const dem_allPortsData = [];

  let activePortCode = '';
  let activeLine = '';
  let importExport = '';
  let activeContainer = '';
  let activeSlub = '';
  let freeDays = '';

  let dem_activePortCode = '';
  let dem_activeLine = '';
  let dem_importExport = '';
  let dem_activeContainer = '';
  let dem_activeSlub = '';
  let dem_freeDays = '';

  for (const item of data) {
    // ignore if no Day Slabs
    if (item.field7 !== '-') {
      // start
      if (item.field2 !== '-') {
        activePortCode = item.field2;
      }
      if (item.field3 !== '-') {
        activeLine = item.field3;
      }
      if (item.field4 !== '-') {
        importExport = item.field4.toLowerCase().trim();
      }
      if (item.field5 !== '-') {
        activeContainer = item.field5;
      }
      if (item.field6 !== '-') {
        freeDays = item.field6;
      }
      if (item.field7 !== '-') {
        activeSlub = item.field7;
      }

      const portData = allPortsData.find((p) => p.code === activePortCode.trim());
      // port / line / containerType  / slab
      if (!portData) {
        const data = {
          code: activePortCode.trim(),
        };
        data[importExport] = [
          {
            title: activeLine,
            data: [
              {
                title: activeContainer,
                data: [
                  {
                    title: activeSlub,
                    data: `${item.field8} ${item.field9}`,
                  },
                ],
                freeDays,
              },
            ],
          },
        ];
        allPortsData.push(data);
      } else {
        // port found, lines:
        let lines = portData[importExport];

        if (!lines) {
          portData[importExport] = [
            {
              title: activeLine,
              data: [
                {
                  title: activeContainer,
                  data: [
                    {
                      title: activeSlub,
                      data: `${item.field8} ${item.field9}`,
                    },
                  ],
                  freeDays,
                },
              ],
            },
          ];
          lines = portData[importExport];
        } else {
          const line = lines.find((c) => c.title === activeLine);
          if (line) {
            const types = line.data;
            const containerType = types.find((c) => c.title === activeContainer);
            if (containerType) {
              // container found, slabs:
              const slabs = containerType.data;

              slabs.push({
                title: activeSlub,
                data: `${item.field8} ${item.field9}`,
              });
            } else {
              types.push({
                title: activeContainer,
                data: [
                  {
                    title: activeSlub,
                    data: `${item.field8} ${item.field9}`,
                  },
                ],
                freeDays,
              });
            }
          } else {
            lines.push({
              title: activeLine,
              data: [
                {
                  title: activeContainer,
                  data: [
                    {
                      title: activeSlub,
                      data: `${item.field8} ${item.field9}`,
                    },
                  ],
                  freeDays,
                },
              ],
            });
          }
        }
      }
    }

    // ignore if no Day Slabs
    if (item.field17 !== '-' && item.field17 !== 'NA') {
      // start
      if (item.field12 !== '-') {
        dem_activePortCode = item.field12;
      }
      if (item.field13 !== '-') {
        dem_activeLine = item.field13;
      }
      if (item.field14 !== '-') {
        dem_importExport = item.field14.toLowerCase().trim();
      }
      if (item.field15 !== '-') {
        dem_activeContainer = item.field15;
      }
      if (item.field16 !== '-') {
        dem_freeDays = item.field16;
      }
      if (item.field17 !== '-') {
        dem_activeSlub = item.field17;
      }

      const portData = dem_allPortsData.find((p) => p.code === dem_activePortCode.trim());
      // port / line / containerType  / slab
      if (!portData) {
        const data = {
          code: dem_activePortCode.trim(),
        };
        data[dem_importExport] = [
          {
            title: dem_activeLine,
            data: [
              {
                title: dem_activeContainer,
                data: [
                  {
                    title: dem_activeSlub,
                    data: `${item.field18} ${item.field19}`,
                  },
                ],
                freeDays: dem_freeDays,
              },
            ],
          },
        ];
        dem_allPortsData.push(data);
      } else {
        // port found, lines:
        let lines = portData[dem_importExport];
        if (!lines) {
          portData[dem_importExport] = [
            {
              title: dem_activeLine,
              data: [
                {
                  title: dem_activeContainer,
                  data: [
                    {
                      title: dem_activeSlub,
                      data: `${item.field18} ${item.field19}`,
                    },
                  ],
                  freeDays: dem_freeDays,
                },
              ],
            },
          ];
          lines = portData[dem_importExport];
        } else {
          const line = lines.find((c) => c.title === dem_activeLine);
          if (line) {
            const types = line.data;
            const containerType = types.find((c) => c.title === dem_activeContainer);
            if (containerType) {
              // container found, slabs:
              const slabs = containerType.data;

              slabs.push({
                title: dem_activeSlub,
                data: `${item.field18} ${item.field19}`,
              });
            } else {
              types.push({
                title: dem_activeContainer,
                data: [
                  {
                    title: dem_activeSlub,
                    data: `${item.field18} ${item.field19}`,
                  },
                ],
                freeDays: dem_freeDays,
              });
            }
          } else {
            lines.push({
              title: dem_activeLine,
              data: [
                {
                  title: dem_activeContainer,
                  data: [
                    {
                      title: dem_activeSlub,
                      data: `${item.field18} ${item.field19}`,
                    },
                  ],
                  freeDays: dem_freeDays,
                },
              ],
            });
          }
        }
      }
    }
  }

  // const pp = allPortsData.find((ap) => ap.code === 'CIABJ');
  // console.log(util.inspect(pp, false, null, true ))

  // const pp = dem_allPortsData.find((ap) => ap.code === 'CIABJ');
  // console.log(util.inspect(pp, false, null, true ))

  const finalPorts = [];

  for (const port of ports) {
    const portCode = port.field5.trim();
    const portData = {
      detention: allPortsData.find((pd) => pd.code === portCode) || [],
      demurrage: dem_allPortsData.find((pd) => pd.code === portCode) || [],
    };
    const theport = {
      code: portCode,
      portData: JSON.stringify(portData),
      name: port.field2,
      country: port.Roles,
      address: port.field9,
      email: port.field10,
      website: port.field11,
      phone: port.field12,
      fax: port.field13,
      office: port.field14,
      tonnage: port.field15,
      volume: port.field16,
      description: port.field6,
      townsNear: port.field19,
      servingLines: port.field21,
      exportRequirements: port.field22,
      exportForms: port.field24,
      exportKey: port.field28,
      importRequirements: port.field30,
      importForms: port.field32,
      importKey: port.field36,
    };
    finalPorts.push(theport);
  }

  const resPorts1 = await webflow.items({ collectionId: '5e641612e129e129e2c90f18' });
  const resPorts2 = await webflow.items({ collectionId: '5e641612e129e129e2c90f18' }, { offset: 100 });
  const resPorts3 = await webflow.items({ collectionId: '5e641612e129e129e2c90f18' }, { offset: 200 });
  const webPorts = [...resPorts1.items, ...resPorts2.items, ...resPorts3.items];

  const resCou1 = await webflow.items({ collectionId: '5e720e3b8110fb1c34cf5b36' });
  const resCou2 = await webflow.items({ collectionId: '5e720e3b8110fb1c34cf5b36' }, { offset: 100 });
  const webCountries = [...resCou1.items, ...resCou2.items];

  for (let fp of finalPorts) {
    const c = webCountries.find(
      (c) =>
        fp.country.toLowerCase().indexOf(c.fullname.toLowerCase()) > -1 ||
        fp.name.toLowerCase().indexOf(c.name.toLowerCase()) > -1 ||
        fp.country.toLowerCase().indexOf(c.name.toLowerCase()) > -1 ||
        fp.address.toLowerCase().indexOf(c.fullname.toLowerCase()) > -1 ||
        fp.address.toLowerCase().indexOf(c.name.toLowerCase()) > -1 ||
        c.fullname.toLowerCase().indexOf(fp.country.toLowerCase()) > -1
    );

    if (c) {
      fp.country = c._id;
    } else {
      console.log('fp ', fp.country);
    }

    const i = webPorts.find((wp) => wp.name.toLowerCase().indexOf(fp.code.toLowerCase()) > -1);
    if (i) {
      fp.images = i['images-2'];
      if (i.image && i.image.url) {
        fp.image = i.image.url;
      }
    }
  }

  // upload
  const collection = '5f38745c65d8f819fca924e0';

  let i = 1;
  for (let port of finalPorts) {
    try {
      await webflow.createItem({
        collectionId: collection,
        fields: {
          _draft: false,
          _archived: false,

          name: port.name,
          code: port.code,
          daysdata: port.portData,
          country: port.country,
          address: port.address,
          email: port.email.replace(/(\r\n|\n|\r)/gm, ''),
          website: port.website.replace(/(\r\n|\n|\r)/gm, ''),
          phone: port.phone.replace(/(\r\n|\n|\r)/gm, ''),
          fax: port.fax.replace(/(\r\n|\n|\r)/gm, ''),
          office: port.office,
          tonnage: port.tonnage,
          volume: port.volume,
          description: port.description,
          townsnear: port.townsNear,
          servinglines: port.servingLines,
          exportrequirements: port.exportRequirements,
          exportforms: port.exportForms,
          exportkey: port.exportKey,
          importrequirements: port.importRequirements,
          importforms: port.importForms,
          importkey: port.importKey,
          image: port.image,
          images: port.images,
        },
      });

      await wait(1100);
      console.log(`${i} done`);
      i++;
    } catch (error) {
      console.log('error ', error);
    }
  }

  console.log('all done');
})();
