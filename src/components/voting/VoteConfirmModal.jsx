import Button from "../ui/Button.jsx";

function VoteConfirmModal({
	candidate,
	voterEmail,
	onCancel,
	onConfirm,
	isSubmitting,
}) {
	if (!candidate) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4">
			<div className="glass-card w-full max-w-lg rounded-3xl p-6 fade-up">
				<h2 className="text-xl text-slate-800">Confirm Your Vote</h2>
				<p className="mt-2 text-sm text-slate-600">
					You are voting as <span className="font-semibold">{voterEmail}</span>.
					This action is final and cannot be changed.
				</p>

				<div className="mt-5 rounded-5xl border border-slate-200 bg-white/75 p-4">
					<div className="flex items-center gap-3">
						<img
							src={candidate.photo}
							alt={`${candidate.name} portrait`}
							className="h-24 w-24 rounded-xl border border-slate-200 object-cover"
						/>
						<div>
							<p className="font-semibold text-slate-800">{candidate.name}</p>
						</div>
					</div>

					<div className="mt-3 gap-3 flex items-center">
						<img
							src={candidate.partySymbol}
							alt={`${candidate.name} party symbol`}
							className=" h-24 w-24 rounded-xl border border-slate-200 bg-white object-cover"
						/>
						<p className="font-semibold text-slate-800">{candidate.party}</p>
					</div>
				</div>

				<div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant="secondary"
						onClick={onCancel}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button type="button" onClick={onConfirm} disabled={isSubmitting}>
						{isSubmitting
							? "Submitting Vote..."
							: `Confirm Vote For ${candidate.name}`}
					</Button>
				</div>
			</div>
		</div>
	);
}

export default VoteConfirmModal;
