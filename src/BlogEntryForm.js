const contentful = require('contentful-management')

const client = contentful.createClient({
  accessToken: 'CFPAT-30dd814aa7c64891596e3ac4813b79905e3ed42de03600ec995a79e86689df21'
})

// Create entry
client.getSpace('pxm2fkt5jy3s')
.then((space) => space.createEntryWithId('blogArticle', '123', {
  fields: {
    bodyText: {
      'en-US': 'Fun times'
    },
    author: {
      'en-US': 'Thom Lamb'
    }
  }
}))
.then((entry) => console.log(entry))
.catch(console.error)

// // Update entry
// client.getSpace('pxm2fkt5jy3s')
// .then((space) => space.getEntry('123'))
// .then((entry) => {
//   entry.fields.title['en-US'] = 'New entry title'
//   return entry.update()
// })
// .then((entry) => console.log(`Entry ${entry.sys.id} updated.`))
// .catch(console.error)