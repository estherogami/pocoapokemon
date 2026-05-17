// Print app — render every artboard stacked on its own A4 page, no DesignCanvas chrome.

function PrintApp() {
  return (
    <PKTweaksCtx.Provider value={{ showMascot: true }}>
      <div className="print-doc">
        <PrintPage label="V1 · Libreta cosida"     w={1280} h={1640}><V1Libreta /></PrintPage>
        <PrintPage label="V2 · Bento cozy"         w={1280} h={1640}><V2Bento /></PrintPage>
        <PrintPage label="V3 · Diario + rail"      w={1280} h={1640}><V3Diary /></PrintPage>
        <PrintPage label="Flujo A · Diario del día"   w={920} h={1240}><FlowDiary /></PrintPage>
        <PrintPage label="Flujo B · Nueva obra"        w={920} h={1240}><FlowBuild /></PrintPage>
        <PrintPage label="Flujo C · Catálogo · DB"     w={920} h={1240}><FlowDBPicker /></PrintPage>
        <PrintPage label="Flujo D · Nueva actividad"   w={920} h={1240}><FlowAgenda /></PrintPage>
        <PrintPage label="Flujo E · Crear hábitat"     w={920} h={1240}><FlowHabitat /></PrintPage>
      </div>
    </PKTweaksCtx.Provider>
  );
}

function PrintPage({ label, w, h, children }) {
  // A4 print box: 210mm × 297mm with 0.5cm margin → usable ~200×287mm. We
  // scale the artboard so its width fits the usable page width; height
  // follows aspect ratio. Both 1280×1640 (0.78) and 920×1240 (0.74) fit A4
  // portrait (0.707) at width — height comes out short.
  const PAGE_W = 200;  // mm
  // mm per artboard pixel so 1px == PAGE_W/w mm
  const scale = (PAGE_W * 3.7795) / w;  // px→mm conversion factor (1mm = 3.7795 px @96dpi)
  return (
    <section className="print-page">
      <div className="print-label">{label}</div>
      <div className="print-frame" style={{
        width:  w * scale + "px",
        height: h * scale + "px",
      }}>
        <div className="print-artboard" style={{
          width: w, height: h, transform: `scale(${scale})`,
        }}>
          {children}
        </div>
      </div>
    </section>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PrintApp />);

// Auto-print: wait for fonts + 500ms.
(async () => {
  try { await document.fonts.ready; } catch {}
  setTimeout(() => window.print(), 500);
})();
