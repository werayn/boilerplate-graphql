SELECT
COUNT (case when "statut_anno" > 0 then 1 else null end) as annotated,
COUNT (case when "statut_anno" = 0 then 1 else null end) as toAnnot
FROM app_ief
