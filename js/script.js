["html", "css", "js", "preview", "title"].forEach(function (el) {
	window["e_" + el] = document.getElementById(el);
});

function run() {
	console.log("Running!");
	var content = "<html><head>";
	content += "\n<style>\n" + e_css.innerText + "\n</style>\n";
	content += "<script>\n" + e_js.innerText + "\n</script>";
	content += "</head>";
	content += "<body>" + e_html.innerText + "</body></html>";
	console.log("Setting SRC to");
	console.log(content);
	e_preview.src = "data:text/html;charset=utf-8," + escape(content);
}

function save() {
	var name = title();
	var listData = scripts();
	if (!(listData.indexOf(name) + 1)) listData.push(name);
	scripts(listData);
	var data = {
		name: name,
		css: e_css.innerText,
		js: e_js.innerText,
		html: e_html.innerText
	}
	localStorage.setItem(name, JSON.stringify(data));
}

function load() {
	var name = title();
	var data = localStorage.getItem(name);
	if (!data) return alert("Script not found!");
	data = JSON.parse(data);
	e_css.innerText = data.css;
	e_js.innerText = data.js;
	e_html.innerText = data.html;
}

function list() {
	alert("Saved scripts:\n"+scripts().join("\n"));
}

function scripts(data) {
	if (data) localStorage.setItem("__scripts", JSON.stringify(data));
	return JSON.parse(localStorage.getItem("__scripts") || "[]");
}

function title(string) {
	if (string) e_title.value = string;
	return e_title.value;
}