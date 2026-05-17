// Pokopia planner — app root. DesignCanvas + 3 variations + Tweaks panel.

const PK_TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showMascot": true
}/*EDITMODE-END*/;

function PokopiaApp() {
  const [t, setTweak] = useTweaks(PK_TWEAK_DEFAULTS);

  return (
    <PKTweaksCtx.Provider value={{ showMascot: t.showMascot }}>
      <DesignCanvas>
        <DCSection
          id="planner"
          title="Pokopia · Planner de proyectos y construcciones"
          subtitle="3 variaciones · cozy/storybook · español"
        >
          <DCArtboard id="v1" label="V1 · Libreta cosida" width={1280} height={1640}>
            <V1Libreta />
          </DCArtboard>
          <DCArtboard id="v2" label="V2 · Bento cozy" width={1280} height={1640}>
            <V2Bento />
          </DCArtboard>
          <DCArtboard id="v3" label="V3 · Diario + rail" width={1280} height={1640}>
            <V3Diary />
          </DCArtboard>
        </DCSection>

        <DCSection
          id="flows"
          title="Flujos sobre V1 · Libreta cosida"
          subtitle="Cómo se crean las notas, obras, actividades de agenda y hábitats — todas comparten el lenguaje del cuaderno"
        >
          <DCArtboard id="f-diary"   label="A · Diario del día"      width={920} height={1240}>
            <FlowDiary />
          </DCArtboard>
          <DCArtboard id="f-build"   label="B · Nueva obra"          width={920} height={1240}>
            <FlowBuild />
          </DCArtboard>
          <DCArtboard id="f-db"      label="C · Catálogo · DB"       width={920} height={1240}>
            <FlowDBPicker />
          </DCArtboard>
          <DCArtboard id="f-agenda"  label="D · Nueva actividad"     width={920} height={1240}>
            <FlowAgenda />
          </DCArtboard>
          <DCArtboard id="f-habitat" label="E · Crear hábitat"        width={920} height={1240}>
            <FlowHabitat />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Decoración">
          <TweakToggle
            label="Mostrar mascota Pokémon"
            value={t.showMascot}
            onChange={(v) => setTweak("showMascot", v)}
          />
        </TweakSection>
      </TweaksPanel>
    </PKTweaksCtx.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PokopiaApp />);
