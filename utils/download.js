import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export default {
	zipAndDownload: (assets, name) => {
		const zip = new JSZip()
		assets.forEach(asset => {
			zip.file(asset.name, urlToPromise(asset.url), { binary: true })
		})
		zip.generateAsync({ type: "blob" }, (metadata) => {
			let msg = "progression : " + metadata.percent.toFixed(2) + " %";
			if (metadata.currentFile) {
				msg += ", current file = " + metadata.currentFile;
			}
		})
			.then((blob) => {

				// see FileSaver.js
				saveAs(blob, `${name}`);

				// showMessage("done !");
			}, (e) => {
				console.log(e)
			});
	},

	downloadFile: (realUrl, name) => {
		saveAs(realUrl, name);
	}
}

const urlToPromise = (url) => {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => response.blob())
			.then((myBlob) => resolve(myBlob))
			.catch(err => reject(err))
	})
}